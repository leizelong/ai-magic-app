import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Form, Input, message, Space, Upload, FormInstance, List, InputNumber } from 'antd'

const { Dragger } = Upload
import './index.scss'
import { exec, generateHash } from '@renderer/utils/tool'
import {
  FrameResult,
  generateKeyframes,
  getFrames,
  getKeyFramesInfo,
  getKeyframesPaths
} from '@renderer/utils/frame'
import { LocalImage } from '@renderer/components/LocalImage'
import {
  SDTaskChannelData,
  createBatchImage2ImageTask,
  createImage2ImageTask,
  createTaggerTask
} from '@renderer/utils/sdApi'
import {
  copyFileToDirectory,
  extractFileNameWithoutExtension,
  readFileToBase64,
  readImage2ImageDirectory,
  readTxtFilesInDirectory
} from '@renderer/utils/file'
import { autoUpdateId } from '@renderer/hooks'
import { combineJianYingVideo } from '@renderer/utils/jianYing'

interface FormValue {
  keyframesOutputPath: string
  videoPath: string
  taggerOutputPath: string
  image2ImageOutputPath: string
  randomSeed?: string
  redrawFactor?: number
}

interface KeyframeDto {
  name?: string
  filePath: string
  prompt?: string
  // image2ImageFilesPath?: string[]
  // img2imgFilePath?: string
  img2imgLoading?: boolean
  img2imgOutputFilePath?: string
  seed?: string
}

export function KeyframesPage() {
  const [form] = Form.useForm<FormValue>()

  const [keyFramesLoading, setKeyframesLoading] = useState(false)

  const [img2imgLoading, setImg2ImgLoading] = useState(false)

  const [taggerLoading, setTaggerLoading] = useState(false)

  const forceUpdate = autoUpdateId()

  const [keyframesDataSource, setKeyframesDataSource] = useState<KeyframeDto[]>([])

  const videoPath = Form.useWatch('videoPath', form)

  const initialValues: Partial<FormValue> = {
    // randomSeed: '-1',
    redrawFactor: 0.7,
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
      return false
    },
    onChange({ file, fileList }) {
      const filePath = fileList[0].originFileObj?.path
      form.setFieldValue('videoPath', filePath)
    }
  }

  async function updateKeyframesData() {
    const values = await form.validateFields()
    const { videoPath, keyframesOutputPath, taggerOutputPath, image2ImageOutputPath } = values
    const filePaths = await getKeyframesPaths(keyframesOutputPath)
    const promptsMap = readTxtFilesInDirectory(taggerOutputPath)
    const image2ImageOutputMap = readImage2ImageDirectory(image2ImageOutputPath)

    const data: KeyframeDto[] = filePaths.map((filePath) => {
      const name = extractFileNameWithoutExtension(filePath)
      const prompt = promptsMap.get(name)
      const { seed, filePath: img2imgOutputFilePath } = image2ImageOutputMap.get(name) || {}

      return {
        filePath,
        name,
        prompt,
        seed,
        img2imgOutputFilePath
      }
    })
    setKeyframesDataSource(data)
  }

  useEffect(() => {
    updateKeyframesData()
  }, [])

  async function handleGenerate() {
    setKeyframesLoading(true)
    try {
      const values = await form.validateFields()
      const { videoPath, keyframesOutputPath } = values
      // const frameRes = await getFrames(videoPath)

      // const keyFrames = frameRes?.frames?.filter((frame) => !!frame.key_frame)

      await generateKeyframes(videoPath, keyframesOutputPath)
      await updateKeyframesData()

      message.success('生成关键帧成功')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setKeyframesLoading(false)
    }
  }

  async function handleTaggerPrompts() {
    const values = await form.validateFields()
    const { keyframesOutputPath, taggerOutputPath } = values

    try {
      setTaggerLoading(true)
      await createTaggerTask({ inputPath: keyframesOutputPath, outputPath: taggerOutputPath })

      message.success('反推关键词成功')
      await updateKeyframesData()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setTaggerLoading(false)
    }
  }

  async function handleBatchImage2Image() {
    try {
      setImg2ImgLoading(true)
      for (let index = 0; index < keyframesDataSource.length; index++) {
        const keyframe = keyframesDataSource[index]
        await handleImg2Img(keyframe, index)
      }
      message.success('批量图生图成功')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setImg2ImgLoading(false)
    }
  }

  async function handleUseSeed(item: KeyframeDto, index: number) {
    const { seed } = item
    if (!seed) {
      message.error('no seed')
      return
    }
    form.setFieldValue('randomSeed', seed)
  }

  async function handleImg2Img(item: KeyframeDto, index: number) {
    const values = await form.validateFields()
    const { image2ImageOutputPath, randomSeed, redrawFactor } = values
    const { prompt = '', filePath, name } = item
    const imgBase64 = readFileToBase64(filePath)
    try {
      keyframesDataSource[index].img2imgLoading = true
      keyframesDataSource[index].img2imgOutputFilePath = ''
      forceUpdate()
      const [img2imgOutputFilePath, seed] = await createImage2ImageTask({
        prompt,
        imgBase64,
        redraw: redrawFactor,
        seed: randomSeed
      })

      keyframesDataSource[index].img2imgOutputFilePath = img2imgOutputFilePath
      const targetFilePath = copyFileToDirectory(
        img2imgOutputFilePath,
        image2ImageOutputPath,
        `${name}-${seed}.png`
      )
      keyframesDataSource[index].seed = seed
      keyframesDataSource[index].img2imgOutputFilePath = targetFilePath

      message.success('图生图成功')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      keyframesDataSource[index].img2imgLoading = false
      forceUpdate()
    }
  }

  async function handleCombineVideo() {
    const { videoPath, image2ImageOutputPath } = await form.validateFields()
    const { keyFrameList, videoInfo } = await getKeyFramesInfo(videoPath, image2ImageOutputPath)
    combineJianYingVideo({ keyFrameList, videoInfo })
  }

  function renderListItem(item: KeyframeDto, index: number) {
    const { filePath, prompt, img2imgLoading, img2imgOutputFilePath } = item

    return (
      <List.Item>
        <Space size="large">
          <LocalImage className="keyframe_image" filePath={filePath}></LocalImage>

          <Input.TextArea
            value={prompt}
            style={{ width: 300, height: '100%' }}
            autoSize={{ minRows: 8, maxRows: 8 }}
          ></Input.TextArea>

          <Space direction="vertical">
            <Button
              type="primary"
              onClick={() => handleImg2Img(item, index)}
              loading={img2imgLoading}
            >
              图生图
            </Button>
            <Button type="primary" onClick={() => handleUseSeed(item, index)}>
              采用种子
            </Button>
          </Space>

          <Space direction="horizontal">
            {/* {img2imgOutputFilePath ? (
              <LocalImage
                key={img2imgOutputFilePath}
                className="keyframe_image"
                filePath={img2imgOutputFilePath}
              ></LocalImage>
            ) : (
              image2ImageFilesPath?.map((filePath) => {
                return (
                  <LocalImage
                    key={filePath}
                    className="keyframe_image"
                    filePath={filePath}
                  ></LocalImage>
                )
              })
            )} */}
            <LocalImage
              // key={filePath}
              className="keyframe_image"
              filePath={img2imgOutputFilePath}
            ></LocalImage>
            {/* {image2ImageFilesPath?.map((filePath, idx) => {
              return (
                <LocalImage
                  // key={filePath}
                  key={`idx${idx}`}
                  className="keyframe_image"
                  filePath={filePath}
                ></LocalImage>
              )
            })} */}
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

        <Form.Item name="randomSeed" label="采样种子">
          <InputNumber disabled style={{ width: 150 }}></InputNumber>
        </Form.Item>
        <Form.Item
          name="redrawFactor"
          label="重绘系数"
          rules={[{ required: true, message: '重绘系数必填' }]}
        >
          <InputNumber
            style={{ width: 150 }}
            min={0.1}
            max={1}
            precision={1}
            step={0.1}
          ></InputNumber>
        </Form.Item>
      </Form>

      <Space direction="horizontal" style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={handleGenerate} loading={keyFramesLoading}>
          生成关键帧
        </Button>
        <Button type="primary" onClick={handleTaggerPrompts} loading={taggerLoading}>
          一键反推提示词
        </Button>
        <Button type="primary" onClick={handleBatchImage2Image} loading={img2imgLoading}>
          一键图生图
        </Button>

        <Button>批量高清</Button>

        <Button type="primary" onClick={handleCombineVideo}>
          剪映合成
        </Button>

        <Button>自动补齐帧</Button>
      </Space>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={keyframesDataSource}
        renderItem={renderListItem}
      ></List>
    </div>
  )
}
