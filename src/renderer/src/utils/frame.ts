import { fs, path } from './module'
import { exec } from './tool'

export type FrameResult = {
  frames: FrameDto[]
}

export interface FrameDto {
  /** 帧类型 */
  pict_type: 'I' | 'P' | 'B'
  /** 是否关键帧 */
  key_frame: 1 | 0
  /**  帧的类型（视频、音频、字幕等） */
  media_type: string
  /** Frame包的pts的时间显示 */
  pkt_dts_time: string
}

export function generateKeyframes(targetPath: string, outputPath: string): any {
  return exec(
    `ffmpeg -i ${targetPath} -vf "select=eq(pict_type\\,I)" -fps_mode vfr -qscale:v 2 -f image2 ${outputPath}/%05d.png`
  )
}

export async function getFrames(filePath: string) {
  return exec<FrameResult>(
    `ffprobe -i ${filePath} -v quiet -select_streams v -show_frames -of json`,
    {
      maxBuffer: 1024 * 1024 * 1024
    },
    { json: true }
  )
}

export async function getKeyFramesInfo(filePath: string) {
  const frameRes = await getFrames(filePath)

  const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)
  return keyFrames
}

export async function getKeyframesPaths(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    try {
      const files = fs.readdirSync(dirPath)
      const filePaths = files.map((file) => {
        return path.join(dirPath, file)
      })
      resolve(filePaths)
    } catch (error) {
      reject(error)
    }
  })
}
