import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Form, Input, message, Space, Upload, FormInstance } from 'antd'

const { Dragger } = Upload
import './index.scss'
import { exec } from '@renderer/utils/tool'
import { FrameResult, generateKeyframes, getFrames } from '@renderer/utils/frame'

interface FormValue {
  outputPath: string
  videoPath: string
}

export function KeyframesPage() {
  const [form] = Form.useForm<FormValue>()
  const [keyFramesLoading, setKeyframesLoading] = useState(false)

  const videoPath = Form.useWatch('videoPath', form)

  const initialValues: Partial<FormValue> = {
    outputPath: '/Users/youyu/Documents/ai-workspace/images',
    videoPath: '/Users/youyu/Documents/projects/image-app/output.mp4'
  }

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    beforeUpload(file, fileList) {
      // console.log('beforeUpload :>> ', file, fileList)
      return false
    },
    onChange({ file, fileList }) {
      const filePath = fileList[0].originFileObj?.path
      form.setFieldValue('videoPath', filePath)
    }
  }

  async function handleGenerate() {
    setKeyframesLoading(true)

    try {
      const values = await form.validateFields()
      const { videoPath, outputPath } = values
      // console.log('values', values)

      const frameRes = await getFrames(videoPath)

      const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)
      // console.log('IFrames :>> ', keyFrames)

      await generateKeyframes(videoPath, outputPath)

      message.success('生成关键帧成功')
    } catch (error: any) {
      message.error(error.message)
      console.log('error :>> ', error)
    } finally {
      setKeyframesLoading(false)
    }

    // const fileObj = new File()
  }

  return (
    <div className="keyframes-page">
      <Form colon form={form} initialValues={initialValues}>
        <Form.Item name="videoPath" rules={[{ required: true, message: '请上传视频' }]}>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击，或者拖动文件上传视频</p>
            <p className="ant-upload-hint">{videoPath}</p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="outputPath"
          label="关键帧生成目录"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input></Input>
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleGenerate} loading={keyFramesLoading}>
        生成关键帧
      </Button>
    </div>
  )
}
