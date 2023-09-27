import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Space, Upload } from 'antd'

const { Dragger } = Upload
import './index.scss'
import { exec } from '@renderer/utils/tool'
import { FrameResult } from '@renderer/utils/frame'

export function KeyframesPage() {
  const [filePath, setFilePath] = useState<string>()

  const draggerProps: UploadProps = {
    name: 'file',
    // multiple: true,
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    beforeUpload(file, fileList) {
      console.log('beforeUpload :>> ', file, fileList)
      setFilePath(file.path)
      return false
    },
    // onChange(info) {
    //   const { status } = info.file
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList)
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`)
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`)
    //   }
    // },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  async function handleGenerate() {
    const frameRes = await exec<FrameResult>(
      `ffprobe -i ${
        filePath || '/Users/youyu/Documents/projects/image-app/output.mp4'
      } -v quiet -select_streams v -show_frames -of json`,
      {
        maxBuffer: 1024 * 1024 * 1024
      },
      { json: true }
    )

    const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)

    console.log('IFrames :>> ', keyFrames)
  }

  return (
    <div className="keyframes-page">
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">{filePath}</p>
      </Dragger>

      <Button type="primary" onClick={handleGenerate}>
        生成关键帧
      </Button>
    </div>
  )
}
