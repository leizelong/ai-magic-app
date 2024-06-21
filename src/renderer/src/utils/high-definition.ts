import { findTargetFile, isDirectoryEmpty } from './file'
import { child_process, fs, path } from './module'
const { BrowserWindow, nativeImage } = require('electron')
const { spawn } = child_process

// 定义Python脚本的路径和参数
const pythonScript = path.join(process.cwd(), 'scripts', 'enhance-images.py') // 替换为实际的Python脚本文件名
const inputDirectory = 'input_images' // 替换为包含输入图像的文件夹路径
const outputDirectory = 'output_images' // 替换为输出高清化后图像的文件夹路径
const resolution = '1440x1080' // 替换为所需的分辨率

function getImageSize(filePath: string) {
  let image = nativeImage.createFromPath(filePath)
  let size = image.getSize()
  return size
}

// 调用Python脚本

// 4:3  => 9: 16     9 / 4 * 3
export async function batchHighDefinition(
  /** 输入图像的文件夹路径 */
  inputDirectory: string,
  /** 输出高清化后图像的文件夹路径 */
  outputDirectory: string
  /** 所需的分辨率 */
  // resolution: string = '1440x1080'
) {
  const firstKeyframe = await findTargetFile(inputDirectory, '.png')

  const size = await getImageSize(firstKeyframe)

  let resolution = '1440x1080'
  // 3: 4
  // if (size.width / size.height === 3 / 4) {
  //   resolution = '750x1448'
  // }

  return new Promise<void>((resolve, reject) => {
    if (isDirectoryEmpty(inputDirectory)) {
      reject(new Error(`${inputDirectory} 目录是空的`))
    }

    const pythonProcess = spawn(
      'python',
      [pythonScript, inputDirectory, outputDirectory, resolution],
      { timeout: 1000, shell: true }
    )

    // 监听Python脚本的标准输出
    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
      resolve()
    })

    // 监听Python脚本的标准错误输出
    pythonProcess.stderr.on('data', (error) => {
      console.log(`stderr: ${error}`)
      reject(new Error(`${error}`))
    })

    // 监听Python脚本的退出事件
    pythonProcess.on('close', (code) => {
      reject(new Error(`Python process closed ${code}`))
    })
  })
}
