import {
  VideoInfo,
  getVideoInfo,
  groupByExt,
  getReadableFileSizeString,
  filterQuatityVideo
} from '@renderer/utils/videoInfo'
import { Button, Col, Input, Radio, Row } from 'antd'
import { SearchProps } from 'antd/es/input'
import { useState } from 'react'

import './index.scss'

export function SearchPage() {
  const [videoInfo, setVideInfo] = useState<VideoInfo>({} as any)
  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    console.log(info?.source, value)
    if (!value) return
    const data = await getVideoInfo(value)
    console.log('data :>> ', data)
    setVideInfo(data)
  }

  const videoList = filterQuatityVideo(groupByExt(videoInfo, 'mp4'))

  console.log('videoList :>> ', videoList)

  return (
    <div className="search-page" style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 30 }}>
        <Input.Search
          defaultValue={'https://www.youtube.com/watch?v=mmUfZt10b6g'}
          onSearch={onSearch}
          allowClear
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
            徒弟看过来，哈哈哈
            <Radio.Group>
              {videoList?.map((video) => {
                return (
                  <Radio value={video.format_id}>{`${video.format_note || ''} ${
                    video.resolution
                  } ${getReadableFileSizeString(video.filesize)}`}</Radio>
                )
              })}
            </Radio.Group>
          </Col>
        </Row>
      </div>

      <div>
        <Button type="primary">Download</Button>
      </div>
    </div>
  )
}
