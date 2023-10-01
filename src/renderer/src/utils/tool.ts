import MD5 from 'crypto-js/md5'
import { fs } from './module'

type ExecOptions = Parameters<typeof window.api.child_process.exec>[1]

type ExecConfig = {
  json?: boolean
}

export function exec<T = any>(cmd: string, options?: ExecOptions, config?: ExecConfig) {
  return new Promise<T>((resolve, reject) => {
    window.api.child_process.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }

      try {
        // const info = JSON.parse(stdout.toString())
        // resolve(info)
        if (!config?.json) {
          resolve(stdout.toString() as T)
        } else {
          const info = JSON.parse(stdout.toString())
          resolve(info)
        }
      } catch (error) {
        reject(error)
        if (stderr) {
          console.log(`${cmd} stderr :>> \n`, stderr)
        }
      }
    })
  })
}

type ReadFileOptions = Parameters<typeof window.api.fs.readFile>[0]

export function readFile(filePath: string, options?: any) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      resolve(e?.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

export function fileToUrl(filePath: string) {
  const buffer = fs.readFileSync(filePath)
  const blob = new Blob([buffer], { type: 'image/png' })
  // console.log('blob :>> ', blob);
  const url = URL.createObjectURL(blob)
  // const base64 = await blobToBase64(blob)
  // console.log('base64 :>> ', base64);
  // console.log('url :>> ', url)
  return url
}

// 生成哈希并控制长度的函数
export function generateHash(input: string, length = 11): string {
  // const input = new Date().getTime().toString()
  const uniqueInput = `${input}_${new Date().getTime().toString()}`
  // 使用MD5哈希算法计算哈希值
  const hash = MD5(uniqueInput).toString()

  // 截取指定长度的哈希值
  const truncatedHash = hash.slice(0, length)

  return truncatedHash
}

export function generateRandomNumber(length = 10) {
  let randomNumber = ''
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10) // 生成随机数字并拼接到结果字符串
  }

  return randomNumber
}

export function generateUUID() {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return uuid
}
