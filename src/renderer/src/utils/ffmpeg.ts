// import * as ffmpeg from 'fluent-ffmpeg'
// import ffmpeg from 'fluent-ffmpeg'
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
