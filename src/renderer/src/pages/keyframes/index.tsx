import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Form, Input, message, Space, Upload, FormInstance, List } from 'antd'

const { Dragger } = Upload
import './index.scss'
import { exec } from '@renderer/utils/tool'
import { FrameResult, generateKeyframes, getFrames, getKeyframesPaths } from '@renderer/utils/frame'
import { LocalImage } from '@renderer/components/LocalImage'

interface FormValue {
  outputPath: string
  videoPath: string
}

interface KeyframeDto {
  filePath: string
  prompts: string
}

export function KeyframesPage() {
  const [form] = Form.useForm<FormValue>()

  const [keyFramesLoading, setKeyframesLoading] = useState(false)

  const [keyframesDataSource, setKeyframesDataSource] = useState<KeyframeDto[]>([])

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

  async function initKeyframesData() {
    const values = form.getFieldsValue()
    const { videoPath, outputPath } = values
    const filePaths = await getKeyframesPaths(outputPath)
    const data = filePaths.map((filePath) => ({
      filePath,
      prompts:
        'anime girl with long hair and a smile looking at the camera, smooth anime cg art, high detailed face anime, beautiful anime portrait, stunning anime face portrait, anime. soft lighting, art of wlop, beautiful anime art style, anime keyframe, makoto shinkai and artgerm, anime still image, beautiful anime artwork, beautiful anime art, in the anime film, visual novel cg, beautiful anime style, detailed anime soft face, anime moe artstyle, realistic anime artstyle, clean detailed anime art, detailed portrait of anime girl, cute anime girl portrait, anime poster film still portrait, still from anime, anime visual of a young woman, trending anime art, realistic - anime, wlop painting style, anime still frame, anime movie frame, the style of wlop, portrait anime girl, detailed anime art, black hair, blurry, blurry background, blurry foreground, blush, depth of field, earrings, open mouth, smile'
    }))
    setKeyframesDataSource(data)
  }

  useEffect(() => {
    initKeyframesData()
  }, [])

  async function handleGenerate() {
    setKeyframesLoading(true)
    try {
      const values = await form.validateFields()
      const { videoPath, outputPath } = values

      // const frameRes = await getFrames(videoPath)

      // const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)

      await generateKeyframes(videoPath, outputPath)
      await initKeyframesData()

      message.success('生成关键帧成功')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setKeyframesLoading(false)
    }

    // const fileObj = new File()
  }

  function renderListItem(item: KeyframeDto) {
    const { filePath, prompts } = item
    return (
      <List.Item>
        <Space size="large">
          <LocalImage className="keyframe_image" filePath={filePath}></LocalImage>

          <Input.TextArea
            value={prompts}
            style={{ width: 300, height: '100%' }}
            autoSize={{ minRows: 8, maxRows: 8 }}
          ></Input.TextArea>

          <Space direction="vertical">
            <Button type="primary">图生图</Button>
          </Space>
        </Space>
      </List.Item>
    )
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
          rules={[{ required: true, message: '关键帧生成目录必填' }]}
        >
          <Input></Input>
        </Form.Item>
      </Form>

      <Space direction="horizontal" style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={handleGenerate} loading={keyFramesLoading}>
          生成关键帧
        </Button>
        <Button type="primary" onClick={handleGenerate}>
          一键反推提示词
        </Button>
        <Button type="primary" onClick={handleGenerate}>
          一键图生图
        </Button>
      </Space>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={keyframesDataSource}
        renderItem={renderListItem}
      ></List>
    </div>
  )
}
