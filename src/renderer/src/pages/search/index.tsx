import {
  VideoInfo,
  getVideoInfo,
  groupByExt,
  getReadableFileSizeString,
  filterQualityVideo
} from '@renderer/utils/videoInfo'
import { Button, Col, Form, Input, Radio, RadioGroupProps, Row, message } from 'antd'
import { InputProps, SearchProps } from 'antd/es/input'
import { useState } from 'react'

import './index.scss'
import { LogView } from '@renderer/components/LogView'
import { fromEventPattern } from 'rxjs'

export function SearchPage() {
  const [videoUrl, setVideUrl] = useState<string>('')
  const [$log, set$log] = useState<any>()

  const onChange: InputProps['onChange'] = async (e) => {
    setVideUrl(e.target.value)
  }

  const handleDownload = () => {
    const spawnCmd = window.api.child_process.spawn(
      'ffmpeg',
      [
        // '-f',
        // `bv[width=${selectedVideo?.width}][ext=mp4]+ba[ext=m4a]`,
        // '--merge-output-format',
        // 'mp4',
        '-i',
        videoUrl,
        '-y',
        '-c',
        'copy',
        // 'test.mp4',

        window.api.path.join(process.cwd(), 'my-video.mp4')
      ],
      {}
    )

    function addStdoutHandler(handler) {
      spawnCmd.stdout.on('data', handler)
      spawnCmd.stderr.on('data', handler)
    }

    function removeStdoutHandler(handler) {
      spawnCmd.stdout.removeListener('data', handler)
      spawnCmd.stdout.removeListener('error', handler)
    }

    const _$log = fromEventPattern(addStdoutHandler, removeStdoutHandler)
    set$log(_$log)
  }

  return (
    <div className="search-page" style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 30 }}>
        <Form.Item label="视频链接">
          <Input allowClear onChange={onChange}></Input>
        </Form.Item>
      </div>

      <div>
        <Button type="primary" onClick={handleDownload}>
          Download
        </Button>
      </div>

      <LogView $log={$log}></LogView>
    </div>
  )
}
