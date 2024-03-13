/**
 * 剪映模板合成
 * 1. 模板拷贝过去剪映草稿目录
 * 2. 替换json文件
 *    2.1 draft_content.json => draft_content.json.back, template-2.tmp
 *    2.2 draft_meta_info.json 转换 draft_virtual_store.json
 *    2.3 draft_cover.jpg 封面图
 */

// import { app } from 'electron'
import { generateDraftContent, generateDraftMetaInfo } from './JianYingDraft'
import { isProd } from './common'
import { extractAudioFromVideoAsync } from './ffmpeg'
import { copyDirectoryContents } from './file'
import { DraftKeyFrameDto } from './frame'
import { path } from './module'

const JianYingAppDraftsDir = 'D:\\Program Files\\JianyingPro Drafts'

const projectRootDirectory = process.cwd() || ''

const prodResourcePath = path.join(path.dirname(path.dirname(__dirname)), 'resources')
const devResourcePath = path.join(projectRootDirectory, 'resources')

const resourcePath = isProd ? prodResourcePath : devResourcePath

const JianYingTemplateDir = path.join(resourcePath, 'templates', 'JianYingDraft')

interface CombineJianYingVideoDto {
  keyFrameList: DraftKeyFrameDto[]
  videoInfo: {
    duration: number
    filePath: string
    fileName: string
  }
}

export function combineJianYingVideo(options: CombineJianYingVideoDto) {
  const { keyFrameList, videoInfo } = options

  const draftProjectName = path.basename(path.dirname(videoInfo.filePath))
  const videoNameWithoutExtension = videoInfo.fileName.replace(/(.*)\..*$/, '$1')

  const audioFileName = `${videoNameWithoutExtension}.mp3`
  const audioFilePath = path.join(path.dirname(videoInfo.filePath), audioFileName)

  // 音频分离
  extractAudioFromVideoAsync(videoInfo.filePath, audioFilePath)

  const audioInfo = {
    filePath: audioFilePath,
    fileName: audioFileName
  }

  // todo 考虑重名
  const draftProjectDir = path.join(JianYingAppDraftsDir, draftProjectName)

  // step1
  copyDirectoryContents(JianYingTemplateDir, draftProjectDir)
  // step2
  generateDraftContent({ keyFrameList, draftProjectDir, videoInfo, audioList: [audioInfo] })

  generateDraftMetaInfo()
}
