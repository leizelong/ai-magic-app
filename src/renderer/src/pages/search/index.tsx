import {
  VideoInfo,
  getVideoInfo,
  groupByExt,
  getReadableFileSizeString,
  filterQualityVideo
} from '@renderer/utils/videoInfo'
import { Button, Col, Input, Radio, RadioGroupProps, Row, message } from 'antd'
import { SearchProps } from 'antd/es/input'
import { useState } from 'react'

import './index.scss'
import { LogView } from '@renderer/components/LogView'
import { fromEventPattern } from 'rxjs'

export function SearchPage() {
  const [videoInfo, setVideInfo] = useState<VideoInfo>({} as any)
  const [$log, set$log] = useState<any>()
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo['formats'][0]>()
  const [searchLoading, setSearchLoading] = useState(false)

  const onSearch: SearchProps['onSearch'] = async (value) => {
    if (!value) return
    try {
      setSearchLoading(true)
      const data = await getVideoInfo(value)
      console.log('data :>> ', data)
      message.success('查询成功')
      setVideInfo(data)
    } catch (error: any) {
      message.error(error?.message || '查询失败')
    } finally {
      setSearchLoading(false)
    }
  }

  const handleVideoChange: RadioGroupProps['onChange'] = (e) => {
    // const targetId = e.target.value
    // const targetVideo = videoList?.find((video) => video.format_id === targetId)
    const targetVideo = e.target.value
    setSelectedVideo(targetVideo)
  }

  const handleDownload = () => {
    if (!setSelectedVideo) {
      message.error('请选择要下载的视频')
      return
    }
    const spawnCmd = window.api.child_process.spawn(
      'yt-dlp',
      [
        // '-f',
        // `bv[width=${selectedVideo?.width}][ext=mp4]+ba[ext=m4a]`,
        // '--merge-output-format',
        // 'mp4',
        '-S',
        `width:${selectedVideo?.width}`,
        '-f',
        '[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
        '-o',
        window.api.path.join(process.cwd(), 'download', '%(title)s [%(id)s].%(ext)s'),
        videoInfo.original_url
      ],
      {}
    )

    function addStdoutHandler(handler) {
      spawnCmd.stdout.on('data', handler)
      spawnCmd.stdout.on('error', handler)
    }

    function removeStdoutHandler(handler) {
      spawnCmd.stdout.removeListener('data', handler)
      spawnCmd.stdout.removeListener('error', handler)
    }

    const _$log = fromEventPattern(addStdoutHandler, removeStdoutHandler)
    set$log(_$log)
  }

  const videoList = filterQualityVideo(groupByExt(videoInfo, 'mp4'))

  return (
    <div className="search-page" style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 30 }}>
        <Input.Search
          defaultValue={'https://youtu.be/t3HEIDwoAeM'}
          onSearch={onSearch}
          allowClear
          loading={searchLoading}
        ></Input.Search>
      </div>

      <div className="video-card">
        <div className="thumbnail">
          {videoInfo?.thumbnail && <img width={150} height={100} src={videoInfo?.thumbnail} />}
        </div>
        <div className="title">{videoInfo?.title}</div>
      </div>

      <div className="assets-box">
        <Row>
          <Col span={12}>
            <Radio.Group onChange={handleVideoChange}>
              {videoList?.map((video) => {
                return (
                  <Radio key={video.format_id} value={video}>{`${video.format_note || ''} ${
                    video.resolution
                  } ${getReadableFileSizeString(video.filesize)}`}</Radio>
                )
              })}
            </Radio.Group>
          </Col>
        </Row>
      </div>

      <div>
        <Button type="primary" onClick={handleDownload}>
          Download
        </Button>
      </div>

      <LogView id={selectedVideo?.format_id} $log={$log}></LogView>
    </div>
  )
}
