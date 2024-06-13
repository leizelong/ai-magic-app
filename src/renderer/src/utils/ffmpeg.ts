import { exec } from './tool'

const ffmpeg = require('fluent-ffmpeg')

export function getVideoDuration(videoPath) {
  return new Promise<number>((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err)
      } else {
        const durationInSeconds = metadata.format.duration
        if (!durationInSeconds) reject(new Error(`Invalid duration`))
        resolve(durationInSeconds || 0)
      }
    })
  })
}

export function extractAudioFromVideoAsync(inputVideoPath, outputAudioPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputVideoPath)
      .output(outputAudioPath)
      .addOutputOption('-y') // 添加 -y 选项以覆盖现有文件
      .on('end', () => {
        console.log('音频文件已成功分离！')
        resolve(outputAudioPath)
      })
      .on('error', (err) => {
        console.error('分离音频文件时出错:', err)
        reject(err)
      })
      .run()
  })
}

export async function getVideoInfo(videoPath: string) {
  // `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 input.mp4`
  const res = await exec<string>(
    `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 ${videoPath}`,
    {
      maxBuffer: 1024 * 1024 * 1024
    }
  )
  // 输出宽度和高度
  const [width, height] = res.split(',')?.map((item) => Number(item))
  return { width, height }
}

export async function removeWatermark(inputVideoPath: string, outputVideoPath: string) {
  // ffmpeg -i input.mp4 -vf "delogo=x=10:y=10:w=100:h=20" output.mp4
  const { width, height } = await getVideoInfo(inputVideoPath)
  const titleHeight = 300
  const bottom = 10
  await exec<string>(
    `ffmpeg -i ${inputVideoPath} -vf "delogo=x=${width * 0.05}:y=${
      height - titleHeight - bottom
    }:w=${width * 0.9}:h=${titleHeight}" ${outputVideoPath} -y`
  )
  console.log('去水印成功 :>> ')
}
/**
 ffmpeg -i D:\ai-workspace\男配富可敌国2\素材\origin.mp4 -vf "delogo=x=0:y=518:w=1000:h=200" D:\ai-workspace\男配富可敌国2\remove-water.mp4

 ffmpeg -i D:\\ai-workspace\\男配富可敌国2\\素材\\origin.mp4 -vf "delogo=x=102.4:y=518:w=819.2:h=200" ./remove-water.mp4 -y

 */
