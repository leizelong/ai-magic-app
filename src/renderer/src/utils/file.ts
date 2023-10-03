import { fs, path } from './module'

const fse = require('fs-extra')

export function extractFileNameWithoutExtension(filePath) {
  // 使用正则表达式匹配文件名部分
  const match = filePath.match(/[^\\\/]+$/)

  // 如果匹配成功，获取文件名并丢弃文件后缀
  if (match) {
    const fileNameWithExtension = match[0]
    const fileNameWithoutExtension = fileNameWithExtension.split('.')[0]
    return fileNameWithoutExtension
  } else {
    return ''
  }
}

export function readTxtFilesInDirectory(directoryPath: string) {
  const filesMap = new Map<string, string>()
  if (!fs.existsSync(directoryPath)) {
    return filesMap
  }

  // 读取目录中的文件列表
  const files = fs.readdirSync(directoryPath)
  // 遍历文件列表
  for (const file of files) {
    const filePath = path.join(directoryPath, file)

    // 检查文件是否为txt文件
    if (path.extname(filePath) === '.txt') {
      // 读取文件内容并存储到Map对象中
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const name = extractFileNameWithoutExtension(file)
      filesMap.set(name, fileContent)
    }
  }

  return filesMap
}

export function readImage2ImageDirectory(directoryPath: string) {
  const filesMap = new Map<string, { filePath: string; seed: string }>()

  if (!fs.existsSync(directoryPath)) {
    return filesMap
  }
  // 读取目录中的文件列表
  const files = fs.readdirSync(directoryPath)

  // 遍历文件列表
  for (const file of files) {
    const filePath = path.join(directoryPath, file)

    // 检查文件是否为txt文件
    if (path.extname(filePath) === '.png') {
      // 读取文件内容并存储到Map对象中, file 0001-seed.png;
      const [keyframeId, seed] = file.replace(/(\d*)-(\d*)\.png/, '$1,$2').split(',')
      filesMap.set(keyframeId, { filePath, seed })
    }
  }

  return filesMap
}

export function getImage2ImageNextIndex(directoryPath: string) {
  // 读取目录中的文件列表
  const files = fs.readdirSync(directoryPath)
  if (!files.length) return '1'.padStart(5, '0')

  const lastFile = files[files.length - 1]
  const fileIndexStr = lastFile.replace(/(\d*)-\d*-.*\.png/, '$1')
  const fileIndex = Number(fileIndexStr)
  const nextFileIndex = Number(fileIndex + 1)
    .toString()
    .padStart(5, '0')
  return nextFileIndex
}

export function readFileToBase64(filePath: string) {
  // 获取文件的扩展名
  const fileExtension = path.extname(filePath).toLowerCase().slice(1)

  // 读取文件的内容
  const fileContent = fs.readFileSync(filePath)

  // 将文件内容编码为Base64字符串
  const base64Data = fileContent.toString('base64')

  // 构建带有文件类型前缀的Data URL
  const dataUrl = `data:image/${fileExtension};base64,${base64Data}`

  return dataUrl
}

export function copyFileToDirectory(
  sourceFilePath: string,
  targetDirectory: string,
  newFileName?: string
): string {
  // 提取源文件的文件名
  const sourceFileName = path.basename(sourceFilePath)

  // 如果提供了新文件名，则使用它，否则使用源文件名
  const targetFileName = newFileName || sourceFileName
  checkAndCreateDirectory(targetDirectory)
  // 构建目标文件的完整路径
  const targetFilePath = path.join(targetDirectory, targetFileName)

  // 检查目标文件是否存在
  if (fs.existsSync(targetFilePath)) {
    console.log(`File "${targetFilePath}" already exists. Overwriting...`)
  }

  // 读取源文件的内容
  const fileContent = fs.readFileSync(sourceFilePath)

  // 将源文件内容写入目标文件
  fs.writeFileSync(targetFilePath, fileContent)
  console.log(`File "${sourceFilePath}" copied to "${targetFilePath}".`)
  return targetFilePath
}

export function copyDirectoryContents(sourceDirectory, targetDirectory) {
  try {
    // 确保目标目录存在，如果不存在则创建
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true })
    }

    // 获取源目录下的所有文件和子目录
    const items = fs.readdirSync(sourceDirectory)

    // 遍历所有文件和子目录
    for (const item of items) {
      const sourceItemPath = path.join(sourceDirectory, item)
      const targetItemPath = path.join(targetDirectory, item)

      // 检查是否是子目录
      if (fs.statSync(sourceItemPath).isDirectory()) {
        // 如果是子目录，递归拷贝子目录的内容
        copyDirectoryContents(sourceItemPath, targetItemPath)
      } else {
        // 如果是文件，拷贝文件到目标目录
        fse.copyFileSync(sourceItemPath, targetItemPath)
      }
    }
  } catch (error) {
    console.error('Error copying directory contents:', error)
    throw error
  }
}

export function listFilesInDirectory(directoryPath: string) {
  try {
    // 读取目录中的所有文件和子文件夹
    const filesAndFolders = fs.readdirSync(directoryPath)

    // 过滤出文件
    const files = filesAndFolders.filter((item) => {
      const itemPath = path.join(directoryPath, item)
      return fs.statSync(itemPath).isFile()
    })

    // 获取文件名和绝对路径
    const fileDetails = files.map((file) => ({
      fileName: file,
      filePath: path.join(directoryPath, file)
    }))

    return fileDetails
  } catch (error: any) {
    console.error(`无法读取目录 ${directoryPath}: ${error.message}`)
    throw error
  }
}

export function writeToFile(content: string, filePath: string) {
  try {
    fs.writeFileSync(filePath, content, 'utf8')
  } catch (error: any) {
    console.error(`写入文件失败：${error.message}`)
    throw error
  }
}

export function writeJsonConfigToFile(config: any, filePath: string) {
  try {
    // 将配置对象转换为 JSON 字符串
    const configJson = JSON.stringify(config, null, 2)

    // 将 JSON 字符串写入到目标文件
    fs.writeFileSync(filePath, configJson, 'utf8')

    console.log(`配置已成功写入到文件：${filePath}`)
  } catch (error: any) {
    console.error(`写入文件失败：${error.message}`)
    throw error
  }
}

export function deleteFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`删除文件失败: ${err}`)
        reject(err)
      } else {
        console.log(`文件已成功删除: ${filePath}`)
        resolve(filePath)
      }
    })
  })
}

export function checkAndCreateDirectory(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true }) // 使用 recursive 选项来创建多级目录
      console.log(`目录已成功创建: ${directoryPath}`)
    } catch (err) {
      console.error(`创建目录失败: ${err}`)
    }
  } else {
    console.log(`目录已存在: ${directoryPath}`)
  }
}

export function deleteDirectoryIfExists(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    try {
      const files = fs.readdirSync(directoryPath)

      for (const file of files) {
        const filePath = path.join(directoryPath, file)
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath) // 删除文件
        } else {
          deleteDirectoryIfExists(filePath) // 递归删除子目录
        }
      }

      fs.rmdirSync(directoryPath) // 删除目录
      console.log(`目录已成功删除: ${directoryPath}`)
    } catch (err) {
      console.error(`删除目录失败: ${err}`)
    }
  } else {
    console.log(`目录不存在: ${directoryPath}`)
  }
}
