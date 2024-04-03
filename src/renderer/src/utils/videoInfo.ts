interface StreamFormat {
  ext: 'mhtml' | 'mp4' | 'webm' | 'm4a' | '3gp'
  format_note: string
  resolution: string
  filesize: number
  format_id: string
  height: number
  width: number
}

export interface VideoInfo {
  formats: StreamFormat[]
  title?: string
  thumbnail?: string
  original_url: string
}

export function getVideoInfo(url: string) {
  return new Promise<any>((resolve, reject) => {
    window.api.child_process.exec(`yt-dlp ${url} --dump-json`, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
      if (stderr) {
        console.log('stderr :>> ', stderr)
      }
      try {
        const info = JSON.parse(stdout)
        resolve(info)
      } catch (error) {
        reject(error)
      }
    })
    setTimeout(() => {
      reject(new Error('搜索超时'))
    }, 1000 * 60);
  })
}

export function groupByExt(videoInfo: VideoInfo | null, targetExt: StreamFormat['ext']) {
  const { formats = [] } = videoInfo || {}
  const resultMap = new Map<StreamFormat['ext'], StreamFormat[]>()
  for (const item of formats) {
    const { ext } = item
    if (!resultMap.has(ext)) {
      resultMap.set(ext, [])
    }
    resultMap.get(ext)?.push(item)
  }
  return resultMap?.get(targetExt)
}

export function filterQualityVideo(videoList?: StreamFormat[]) {
  return videoList?.filter((video) => !!(video.format_note && video.filesize)  )
}

export function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
  do {
    fileSizeInBytes /= 1024
    i++
  } while (fileSizeInBytes > 1024)

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}
