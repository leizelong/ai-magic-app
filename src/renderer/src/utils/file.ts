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
  const filesMap = new Map<string, { filePath: string; seed: string }>()

  // 读取目录中的文件列表
  const files = fs.readdirSync(directoryPath)

  // 遍历文件列表
  for (const file of files) {
    const filePath = path.join(directoryPath, file)

    // 检查文件是否为txt文件
    if (path.extname(filePath) === '.png') {
      // 读取文件内容并存储到Map对象中, file 0001-seed.png;
      const [keyframeId, seed] = file.replace(/(\d*)-(\d*)\.png/, '$1,$2').split(',')
      // if (filesMap.has(keyframeId)) break
      // if (!filesMap.has(keyframeId)) {
      //   filesMap.set(keyframeId, )
      // }
      filesMap.set(keyframeId, { filePath, seed })

      // const fileContent = fs.readFileSync(filePath, 'utf8')
      // const name = extractFileNameWithoutExtension(file)
      // filesMap.set(name, fileContent)
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
