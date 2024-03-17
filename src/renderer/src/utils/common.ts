import { child_process, path } from './module'

export const isProd = process.env.NODE_ENV === 'production'

export function execCommand(command: string, args?: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const spawnCmd = child_process.spawn(command, args)
    spawnCmd.stdout.on('data', (data) => resolve(data.toString()))
    spawnCmd.stderr.on('data', (data) => resolve(data.toString()))
    spawnCmd.stdout.on('error', (data) => reject(data.toString()))
    spawnCmd.stderr.on('error', (data) => reject(data.toString()))
  })
}

export function getUnpackPath(...pathList: string[]) {
  const projectRootDirectory = process.cwd() || ''

  const prodRootPath = path.join(path.dirname(path.dirname(__dirname)), ...pathList)
  const devRootPath = path.join(projectRootDirectory, ...pathList)

  const targetPath = isProd ? prodRootPath : devRootPath

  return targetPath
}
