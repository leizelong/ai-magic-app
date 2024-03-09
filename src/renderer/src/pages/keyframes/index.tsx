import React, { useEffect, useRef, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Upload,
  FormInstance,
  List,
  InputNumber,
  Select
} from 'antd'
import './index.scss'
import { exec, generateHash, playSuccessMusic, sleep } from '@renderer/utils/tool'
import {
  FrameResult,
  generateFramesP,
  generateKeyframes,
  getFrames,
  getKeyFramesInfo,
  getKeyframesPaths
} from '@renderer/utils/frame'
import { LocalImage } from '@renderer/components/LocalImage'
import { createImage2ImageTask, createTaggerTask } from '@renderer/utils/sdApi'
import {
  checkAndCreateDirectory,
  copyFileToDirectory,
  deleteFileAsync,
  extractFileNameWithoutExtension,
  readFileToBase64,
  readImage2ImageDirectory,
  readTxtFilesInDirectory,
  writeToFile
} from '@renderer/utils/file'
import { autoUpdateId } from '@renderer/hooks'
import { combineJianYingVideo } from '@renderer/utils/jianYing'
import { path } from '@renderer/utils/module'
import { SearchProps } from 'antd/es/input'
import { batchHighDefinition } from '@renderer/utils/high-definition'
import { SDModelDto, SDModelList } from '@renderer/constants/sd-model'

const { Dragger } = Upload

interface FormValue {
  // keyframesOutputPath: string
  // videoPath: string
  // taggerOutputPath: string
  // image2ImageOutputPath: string
  // image2ImageHighOutputPath: string
  randomSeed?: string
  redrawFactor?: number
  projectDirectoryPath: string
  model: SDModelDto
}

interface ProjectAllDirectory {
  keyframesOutputPath: string
  framesPOutputPath: string
  videoPath: string
  taggerOutputPath: string
  image2ImageOutputPath: string
  image2ImageHighOutputPath: string
}

interface KeyframeDto {
  name?: string
  filePath: string
  prompt?: string
  // image2ImageFilesPath?: string[]
  // img2imgFilePath?: string
  img2imgLoading?: boolean
  img2imgOutputFilePath?: string
  imgHighDefinitionFilePath?: string
  seed?: string
}

export function KeyframesPage() {
  const [form] = Form.useForm<FormValue>()

  const [keyFramesLoading, setKeyframesLoading] = useState(false)

  const [img2imgLoading, setImg2ImgLoading] = useState(false)

  const [taggerLoading, setTaggerLoading] = useState(false)

  const [batchHighDefinitionLoading, setBatchHighDefinitionLoading] = useState(false)

  const [combineLoading, setCombineLoading] = useState(false)

  const [pageResultLoading, setPageResultLoading] = useState(true)

  const [searchLoading, setSearchLoading] = useState(false)

  const forceUpdate = autoUpdateId()

  // const [keyframesDataSource, setKeyframesDataSource] = useState<KeyframeDto[]>([])
  const keyFramesDataSourceRef = useRef<KeyframeDto[]>([])

  // const videoPath = Form.useWatch('videoPath', form)

  const initialValues: Partial<FormValue> = {
    redrawFactor: 0.7,
    model: SDModelList[0],
    projectDirectoryPath: 'D:\\ai-workspace\\坏脾气女友-6'
    // keyframesOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes',
    // videoPath: 'D:\\ai-workspace\\好声音第一集\\01rm.mp4',
    // taggerOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes-tagger',
    // image2ImageOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes-output',
    // image2ImageHighOutputPath: 'D:\\ai-workspace\\好声音第一集\\keyframes-upscale'
  }

  function getProjectAllPaths(): ProjectAllDirectory {
    // const { projectDirectoryPath } = await form.validateFields()
    const { projectDirectoryPath } = form.getFieldsValue()
    const videoPath = path.join(projectDirectoryPath, 'origin.mp4')
    const keyframesOutputPath = path.join(projectDirectoryPath, 'keyframes')
    const taggerOutputPath = path.join(projectDirectoryPath, 'keyframes-tagger')
    const image2ImageOutputPath = path.join(projectDirectoryPath, 'keyframes-output')
    const image2ImageHighOutputPath = path.join(projectDirectoryPath, 'keyframes-upscale')
    const framesPOutputPath = path.join(projectDirectoryPath, 'frames-P')
    return {
      framesPOutputPath,
      videoPath,
      keyframesOutputPath,
      taggerOutputPath,
      image2ImageOutputPath,
      image2ImageHighOutputPath
    }
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
    try {
      setPageResultLoading(true)
      const {
        keyframesOutputPath,
        taggerOutputPath,
        image2ImageOutputPath,
        image2ImageHighOutputPath
      } = await getProjectAllPaths()
      const filePaths = await getKeyframesPaths(keyframesOutputPath)
      const promptsMap = readTxtFilesInDirectory(taggerOutputPath)
      const image2ImageOutputMap = readImage2ImageDirectory(image2ImageOutputPath)
      const imageHighDefinitionOutputMap = readImage2ImageDirectory(image2ImageHighOutputPath)

      const data: KeyframeDto[] = filePaths.map((filePath) => {
        const name = extractFileNameWithoutExtension(filePath)
        const prompt = promptsMap.get(name)
        const { seed, filePath: img2imgOutputFilePath } = image2ImageOutputMap.get(name) || {}
        const { filePath: imgHighDefinitionFilePath } = imageHighDefinitionOutputMap.get(name) || {}
        return {
          filePath,
          name,
          prompt,
          seed,
          img2imgOutputFilePath,
          imgHighDefinitionFilePath
        }
      })
      keyFramesDataSourceRef.current = data
      forceUpdate()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setPageResultLoading(false)
    }
  }

  useEffect(() => {
    updateKeyframesData()
  }, [])

  async function handleGenerate() {
    setKeyframesLoading(true)
    try {
      const { videoPath, keyframesOutputPath, framesPOutputPath } = await getProjectAllPaths()

      // 生成P帧，弥补I帧
      // await generateFramesP(videoPath, framesPOutputPath)
      await generateKeyframes(videoPath, keyframesOutputPath)

      await updateKeyframesData()

      message.success('生成关键帧成功')
      playSuccessMusic()
    } catch (error: any) {
      message.error(error.message)
      throw error
    } finally {
      setKeyframesLoading(false)
    }
  }

  async function handleTaggerPrompts() {
    const { keyframesOutputPath, taggerOutputPath } = await getProjectAllPaths()

    try {
      setTaggerLoading(true)
      await createTaggerTask({ inputPath: keyframesOutputPath, outputPath: taggerOutputPath })
      // 部分更新
      await updateKeyframesData()
      message.success('反推关键词成功')
      playSuccessMusic()
    } catch (error: any) {
      message.error(error.message)
      throw error
    } finally {
      setTaggerLoading(false)
    }
  }

  async function handleBatchImage2Image() {
    try {
      setImg2ImgLoading(true)
      if (!keyFramesDataSourceRef.current.length) {
        throw new Error('keyframesDataSource 是空的')
      }
      for (let index = 0; index < keyFramesDataSourceRef.current.length; index++) {
        const keyframe = keyFramesDataSourceRef.current[index]
        await handleImg2Img(keyframe, index, true)
      }
      message.success('批量图生图成功')
      playSuccessMusic()
    } catch (error: any) {
      message.error(error.message)
      throw error
    } finally {
      setImg2ImgLoading(false)
    }
  }

  async function handleBatchHighImage() {
    try {
      setBatchHighDefinitionLoading(true)
      const { image2ImageHighOutputPath, image2ImageOutputPath } = getProjectAllPaths()
      checkAndCreateDirectory(image2ImageHighOutputPath)
      await batchHighDefinition(image2ImageOutputPath, image2ImageHighOutputPath)
      updateKeyframesData()
      message.success('批量高清成功')
      playSuccessMusic()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setBatchHighDefinitionLoading(false)
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

  async function handleImg2Img(item: KeyframeDto, index: number, isBatch?: boolean) {
    const values = await form.validateFields()
    const { image2ImageOutputPath } = await getProjectAllPaths()
    const { randomSeed, redrawFactor, model } = values
    if (isBatch && keyFramesDataSourceRef.current[index].img2imgOutputFilePath) {
      // 批量处理，有图就跳过吧
      return
    }
    const { prompt = '', filePath, name } = item
    const imgBase64 = readFileToBase64(filePath)
    try {
      if (keyFramesDataSourceRef.current[index].img2imgOutputFilePath) {
        // delete 原图
        await deleteFileAsync(keyFramesDataSourceRef.current[index].img2imgOutputFilePath)
      }
      keyFramesDataSourceRef.current[index].img2imgLoading = true
      keyFramesDataSourceRef.current[index].img2imgOutputFilePath = ''
      forceUpdate()
      const [img2imgOutputFilePath, seed] = await createImage2ImageTask({
        prompt,
        imgBase64,
        redraw: redrawFactor,
        seed: randomSeed,
        model
      })

      keyFramesDataSourceRef.current[index].img2imgOutputFilePath = img2imgOutputFilePath
      const targetFilePath = copyFileToDirectory(
        img2imgOutputFilePath,
        image2ImageOutputPath,
        `${name}-${seed}.png`
      )
      keyFramesDataSourceRef.current[index].seed = seed
      keyFramesDataSourceRef.current[index].img2imgOutputFilePath = targetFilePath
      if (!isBatch) {
        message.success('图生图成功')
        playSuccessMusic()
      }
    } catch (error: any) {
      message.error(error.message)
    } finally {
      keyFramesDataSourceRef.current[index].img2imgLoading = false
      forceUpdate()
    }
  }

  async function handleCombineVideo() {
    const { videoPath, image2ImageHighOutputPath } = await getProjectAllPaths()
    try {
      setCombineLoading(true)
      const { keyFrameList, videoInfo } = await getKeyFramesInfo(
        videoPath,
        image2ImageHighOutputPath
      )
      // todo 检测草稿是否存在，提示是否覆盖
      combineJianYingVideo({ keyFrameList, videoInfo })
      message.success('剪映草稿视频合成成功')
      playSuccessMusic()
    } catch (error: any) {
      if (error.message.includes('does not exist')) {
        message.error('请先把图片批量高清处理')
      } else {
        message.error(error.message)
      }
    } finally {
      setCombineLoading(false)
    }
  }

  async function handlePromptComplete(e: any, item: KeyframeDto, index: number) {
    const value = e.target.value
    const { taggerOutputPath } = getProjectAllPaths()
    const promptPath = path.join(taggerOutputPath, `${item.name}.txt`)
    keyFramesDataSourceRef.current[index].prompt = value
    forceUpdate()
    writeToFile(value, promptPath)
  }

  const handleProjectDirectorySearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (!value) return

    try {
      setSearchLoading(true)
      updateKeyframesData()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setSearchLoading(false)
    }
  }

  async function handleTotalSteps() {
    await handleGenerate()
    await handleTaggerPrompts()
    await handleBatchImage2Image()
    await handleBatchHighImage()
    await handleCombineVideo()
  }

  function renderListItem(item: KeyframeDto, index: number) {
    const { filePath, prompt, img2imgLoading, img2imgOutputFilePath, imgHighDefinitionFilePath } =
      item

    return (
      <List.Item>
        <Space size="large">
          <Space direction="vertical">
            <div style={{ fontSize: 16 }}>{index + 1}</div>
          </Space>
          <LocalImage className="keyframe_image" filePath={filePath}></LocalImage>

          <Input.TextArea
            // value={prompt}
            key={prompt}
            defaultValue={prompt}
            style={{ width: 300, height: '100%' }}
            autoSize={{ minRows: 8, maxRows: 8 }}
            onBlur={(e) => handlePromptComplete(e, item, index)}
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
            <LocalImage className="keyframe_image" filePath={img2imgOutputFilePath}></LocalImage>
          </Space>

          {img2imgOutputFilePath && (
            <>
              <Space direction="horizontal">{`=>`}</Space>
              <Space direction="horizontal">
                <LocalImage
                  className="keyframe_image"
                  filePath={imgHighDefinitionFilePath}
                ></LocalImage>
              </Space>
            </>
          )}
        </Space>
      </List.Item>
    )
  }

  return (
    <div className="keyframes-page">
      <Form colon form={form} initialValues={initialValues}>
        <Form.Item
          name="projectDirectoryPath"
          label="项目工程目录"
          rules={[{ required: true, message: '项目工程目录必填' }]}
        >
          <Input.Search
            placeholder="input search text"
            loading={searchLoading}
            onSearch={handleProjectDirectorySearch}
            enterButton
          />
        </Form.Item>
        {/* <Form.Item name="videoPath" rules={[{ required: true, message: '请上传视频' }]}>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击，或者拖动文件上传视频</p>
            <p className="ant-upload-hint">{videoPath}</p>
          </Dragger>
        </Form.Item> */}

        {/*

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
        <Form.Item
          name="image2ImageHighOutputPath"
          label="高清修复生成目录"
          rules={[{ required: true, message: '高清修复生成目录必填' }]}
        >
          <Input></Input>
        </Form.Item> */}

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
        <Form.Item name="model" label="模型" rules={[{ required: true, message: '模型必填' }]}>
          <Select style={{ width: 200 }} options={SDModelList} labelInValue></Select>
        </Form.Item>
      </Form>
      <Space direction="vertical" style={{ marginBottom: 24 }}>
        <Space direction="horizontal">
          <Button type="primary" onClick={handleGenerate} loading={keyFramesLoading}>
            生成关键帧
          </Button>
          <Button type="primary" onClick={handleTaggerPrompts} loading={taggerLoading}>
            一键反推提示词
          </Button>
          <Button type="primary" onClick={handleBatchImage2Image} loading={img2imgLoading}>
            一键图生图
          </Button>

          <Button
            type="primary"
            onClick={handleBatchHighImage}
            loading={batchHighDefinitionLoading}
          >
            批量高清
          </Button>

          <Button type="primary" onClick={handleCombineVideo} loading={combineLoading}>
            剪映合成
          </Button>
        </Space>

        <Space direction="horizontal">
          <Button type="primary" onClick={handleTotalSteps}>
            一键生成
          </Button>
        </Space>
      </Space>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={keyFramesDataSourceRef.current}
        renderItem={renderListItem}
        loading={pageResultLoading}
      ></List>
    </div>
  )
}
