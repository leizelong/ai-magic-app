import { fs, path } from './module'

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
  const filesMap = new Map<string, string>()

  // 读取目录中的文件列表
  const files = fs.readdirSync(directoryPath)
// debugger
  // 遍历文件列表
  for (const file of files) {
    const filePath = path.join(directoryPath, file)

    // 检查文件是否为txt文件
    if (path.extname(filePath) === '.png') {
      // 读取文件内容并存储到Map对象中, file 00000-0001.png;
      const keyframeId = file.replace(/\d*-(\d*)\.png/, '$1')
      if (filesMap.has(keyframeId)) break
      filesMap.set(keyframeId, filePath)

      // const fileContent = fs.readFileSync(filePath, 'utf8')
      // const name = extractFileNameWithoutExtension(file)
      // filesMap.set(name, fileContent)
    }
  }

  return filesMap
}
