import { checkAndCreateDirectory, listFilesInDirectory } from './file'
import { fs, path } from './module'
import { exec } from './tool'
import { getVideoDuration } from './ffmpeg'

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
// ffmpeg -i D:\ai-workspace\带某子逗阵\origin.mp4 -vf "select=eq(pict_type,B)" -fps_mode vfr -qscale:v 2 -f image2 D:\ai-workspace\带某子逗阵\keyframes-B/%05d.png
// ffmpeg -i 666051400.mp4 -filter:v "select='gt(scene,0.1)',showinfo"

// ffmpeg -i origin.mp4 -vf "select='gt(scene,1)',showinfo" -fps_mode vfr -qscale:v 2 -f image2 ./keyframes-test/%05d.png

export function generateFramesB(targetPath: string, outputPath: string) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${targetPath} does not exist`)
  }
  checkAndCreateDirectory(outputPath)
  return exec(
    `ffmpeg -i ${targetPath} -vf "select=eq(pict_type\\,B)" -fps_mode vfr -qscale:v 30 -f image2 ${outputPath}/%05d.png`
  )
}

export function generateFramesP(targetPath: string, outputPath: string) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${targetPath} does not exist`)
  }
  checkAndCreateDirectory(outputPath)
  return exec(
    `ffmpeg -i ${targetPath} -vf "select=eq(pict_type\\,P)" -fps_mode vfr -qscale:v 15 -f image2 ${outputPath}/%05d.png`
  )
}

export function generateKeyframes(targetPath: string, outputPath: string) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${targetPath} does not exist`)
  }
  checkAndCreateDirectory(outputPath)
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

export interface DraftKeyFrameDto {
  fileName: string
  filePath: string
  start: number
  duration: number
}

export async function getKeyFramesInfo(
  videoPath: string,
  keyFramesDir: string
): Promise<{
  keyFrameList: DraftKeyFrameDto[]
  videoInfo: {
    duration: number
    filePath: string
    fileName: string
  }
}> {
  if (!fs.existsSync(keyFramesDir)) {
    throw new Error(`KeyFramesDir: ${keyFramesDir} does not exist`)
  }
  const frameRes = await getFrames(videoPath)
  const videoDurationS = await getVideoDuration(videoPath)
  const videoDuration = Number((videoDurationS * 1000 * 1000).toFixed(0))

  const filesInfo = listFilesInDirectory(keyFramesDir)
  const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)

  const videoInfo = {
    duration: videoDuration,
    filePath: videoPath,
    fileName: path.basename(videoPath)
  }

  const keyFrameList: DraftKeyFrameDto[] = []
  let preFrameTimeStamp = 0
  for (let index = 0; index < keyFrames.length; index++) {
    const keyFrame = keyFrames[index]
    const { fileName, filePath } = filesInfo[index] || {}
    const { pkt_dts_time } = keyFrame
    const curFrameTimeStamp = Number((Number(pkt_dts_time) * 1000 * 1000).toFixed(0))

    const duration = curFrameTimeStamp - preFrameTimeStamp
    preFrameTimeStamp = curFrameTimeStamp

    keyFrameList.push({
      // ...keyFrame,
      fileName,
      filePath,
      start: curFrameTimeStamp,
      duration: 0
    })

    if (index > 0) {
      keyFrameList[index - 1].duration = duration
    }

    if (index === keyFrames.length - 1) {
      keyFrameList[index].duration = videoDuration - curFrameTimeStamp
    }
  }

  return { keyFrameList, videoInfo }
}

export async function getKeyframesPaths(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    try {
      if (!fs.existsSync(dirPath)) {
        resolve([])
        // reject(new Error(`directory "${dirPath}" does not exist`))
      }
      const files = fs.readdirSync(dirPath)
      const filePaths: string[] = []
      files.forEach((file) => {
        if (path.extname(file) === '.png') {
          const filePath = path.join(dirPath, file)
          filePaths.push(filePath)
        }
      })
      resolve(filePaths)
    } catch (error) {
      reject(error)
    }
  })
}
