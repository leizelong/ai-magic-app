const { spawn } = require('node:child_process');
const path = require('path')

// 定义Python脚本的路径和参数
const pythonScript = path.join(process.cwd(), 'scripts', 'test.py') // 替换为实际的Python脚本文件名

const pythonProcess = spawn('python', [
  pythonScript
  // inputDirectory,
  // outputDirectory,
  // resolution
])

// 监听Python脚本的标准输出
pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})

// 监听Python脚本的标准错误输出
pythonProcess.stderr.on('data', (error) => {
  console.log('stderr :>> ', error )
})

// 监听Python脚本的退出事件
pythonProcess.on('close', (code) => {
  console.log('close code :>> ', code)
})
