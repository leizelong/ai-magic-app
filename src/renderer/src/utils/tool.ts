import MD5 from 'crypto-js/md5'
import { child_process, fs, path } from './module'
import tipAudio from '../../../../resources/audio/完成提示音.mp3'

type ExecOptions = Parameters<typeof window.api.child_process.exec>[1]

type ExecConfig = {
  json?: boolean
}

export function exec<T = any>(cmd: string, options?: ExecOptions, config?: ExecConfig) {
  return new Promise<T>((resolve, reject) => {
    child_process.exec(cmd, options, (err, stdout, stderr) => {
      console.log('exec cmd :>> ', cmd)

      if (err) {
        reject(err)
      }
      try {
        console.log('stdout.toString() :>> ', stdout.toString())
        console.log('stderr.toString() :>> ', stderr.toString())
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
  const url = URL.createObjectURL(blob)
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

export function playSuccessMusic() {
  // 加载音频文件
  const audio = new Audio(tipAudio)

  // 播放音频
  audio.play()
}

export function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function isChineseCharacter(character) {
  const chineseCharacterRegex = /[\u4e00-\u9fa5]/
  return chineseCharacterRegex.test(character)
}

export function stringToUnicode(input) {
  let unicodeString = ''
  for (let i = 0; i < input.length; i++) {
    if (isChineseCharacter(input[i])) {
      const charCode = input.charCodeAt(i).toString(16) // 获取字符的Unicode编码并转换为16进制
      unicodeString += `\\\\u${charCode.padStart(4, '0')}` // 补齐4位，然后加上\\u前缀
    } else {
      unicodeString += input[i]
    }
  }
  return unicodeString
}

export function unicodeToString(unicodeString) {
  return unicodeString.replace(/\\u(\w{4})/g, function (match, group) {
    return String.fromCharCode(parseInt(group, 16))
  })
}

interface SettingConfig {
  workspacePath: string
  lastProjectPath: string

}

const settingConfigPath = path.join(process.cwd(), 'setting.json')

const defaultConfiguration = {
  workspacePath: 'D:\\ai-workspace',
  lastProjectPath: ''
}

export function getSettingConfig(): SettingConfig {
  if (!fs.existsSync(settingConfigPath)) {
    return defaultConfiguration
  }
  const fileStr = fs.readFileSync(settingConfigPath, { encoding: 'utf8' })
  try {
    return JSON.parse(fileStr)
  } catch (error) {
    return defaultConfiguration
  }
}

export function updateSettingConfig(value: Partial<SettingConfig>) {
  const originalValue = getSettingConfig()

  const fileStr = JSON.stringify({ ...originalValue, ...value }, null, 2)

  fs.writeFileSync(settingConfigPath, fileStr)
}
