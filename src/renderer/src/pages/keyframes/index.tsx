import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Form, Input, message, Space, Upload, FormInstance, List } from 'antd'

const { Dragger } = Upload
import './index.scss'
import { exec, generateHash } from '@renderer/utils/tool'
import { FrameResult, generateKeyframes, getFrames, getKeyframesPaths } from '@renderer/utils/frame'
import { LocalImage } from '@renderer/components/LocalImage'
import { webSocket } from 'rxjs/webSocket'
import {
  SDTaskChannelData,
  createBatchImage2ImageTask,
  createTaggerTask
} from '@renderer/utils/sdApi'
import {
  extractFileNameWithoutExtension,
  readImage2ImageDirectory,
  readTxtFilesInDirectory
} from '@renderer/utils/file'

interface FormValue {
  keyframesOutputPath: string
  videoPath: string
  taggerOutputPath: string
  image2ImageOutputPath: string
}

interface KeyframeDto {
  name?: string
  filePath: string
  prompts?: string
  image2ImageFilePath?: string
}

export function KeyframesPage() {
  const [form] = Form.useForm<FormValue>()

  const [keyFramesLoading, setKeyframesLoading] = useState(false)

  const [keyframesDataSource, setKeyframesDataSource] = useState<KeyframeDto[]>([])

  const videoPath = Form.useWatch('videoPath', form)

  const initialValues: Partial<FormValue> = {
    keyframesOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes',
    videoPath: 'D:\\ai-workspace\\好声音第一集\\01-noart-10s.mp4',
    taggerOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes-tagger',
    image2ImageOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes-output'
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
    const values = await form.validateFields()
    const { videoPath, keyframesOutputPath, taggerOutputPath, image2ImageOutputPath } = values
    console.log('initKeyframesData values :>> ', values)
    const filePaths = await getKeyframesPaths(keyframesOutputPath)
    const promptsMap = readTxtFilesInDirectory(taggerOutputPath)
    const image2ImageOutputMap = readImage2ImageDirectory(image2ImageOutputPath)

    console.log('promptsMap :>> ', promptsMap)
    console.log('image2ImageOutputMap :>> ', image2ImageOutputMap)

    const data = filePaths.map((filePath) => {
      const name = extractFileNameWithoutExtension(filePath)
      const prompts = promptsMap.get(name)
      return {
        filePath,
        name,
        prompts,
        image2ImageFilePath: image2ImageOutputMap.get(name)
      }
    })
    setKeyframesDataSource(data)
  }

  useEffect(() => {
    setTimeout(() => {
      initKeyframesData()
    }, 1000)
  }, [])

  async function handleGenerate() {
    setKeyframesLoading(true)
    try {
      const values = await form.validateFields()
      const { videoPath, keyframesOutputPath } = values
      // const frameRes = await getFrames(videoPath)

      // const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)

      await generateKeyframes(videoPath, keyframesOutputPath)
      await initKeyframesData()

      message.success('生成关键帧成功')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setKeyframesLoading(false)
    }

    // const fileObj = new File()
  }

  async function handleTaggerPrompts() {
    const values = await form.validateFields()
    const { keyframesOutputPath, taggerOutputPath } = values
    await createTaggerTask({ inputPath: keyframesOutputPath, outputPath: taggerOutputPath })

    message.success('反推关键词成功')

    const promptsMap = readTxtFilesInDirectory(taggerOutputPath)
    let nextKeyframes = [...keyframesDataSource]
    nextKeyframes = nextKeyframes.map((keyframe) => {
      const { name } = keyframe
      if (!name) return keyframe
      const prompts = promptsMap.get(name)
      return { ...keyframe, prompts }
    })
    setKeyframesDataSource(nextKeyframes)
  }

  async function handleBatchImage2Image() {
    const values = await form.validateFields()
    const { keyframesOutputPath, image2ImageOutputPath, taggerOutputPath } = values

    await createBatchImage2ImageTask({
      inputPath: keyframesOutputPath,
      outputPath: image2ImageOutputPath,
      promptPath: taggerOutputPath
    })
  }

  function renderListItem(item: KeyframeDto) {
    const { filePath, prompts, image2ImageFilePath } = item
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

          <LocalImage className="image2image" filePath={image2ImageFilePath}></LocalImage>
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
          name="keyframesOutputPath"
          label="关键帧生成目录"
          rules={[{ required: true, message: '关键帧生成目录必填' }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name="taggerOutputPath"
          label="反推提示词生成目录"
          rules={[{ required: true, message: '反推提示词生成目录必填' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="image2ImageOutputPath"
          label="批量图生图生成目录"
          rules={[{ required: true, message: '批量图生图生成目录必填' }]}
        >
          <Input></Input>
        </Form.Item>
      </Form>

      <Space direction="horizontal" style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={handleGenerate} loading={keyFramesLoading}>
          生成关键帧
        </Button>
        <Button type="primary" onClick={handleTaggerPrompts}>
          一键反推提示词
        </Button>
        <Button type="primary" onClick={handleBatchImage2Image}>
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
