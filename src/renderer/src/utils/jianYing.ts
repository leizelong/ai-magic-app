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
import { copyDirectoryContents } from './file'
import { path } from './module'



const JianYingAppDraftsDir = 'D:\\Program Files\\JianyingPro Drafts'
const projectRootDirectory = process.env.INIT_CWD || ''
const JianYingTemplateDir = path.join(projectRootDirectory, 'templates', 'JianYingDraft')


export function combineJianYingVideo() {
  const draftProjectName = 'test'
  // todo 考虑重名
  const draftProjectDir = path.join(JianYingAppDraftsDir, draftProjectName)
  // step1
  copyDirectoryContents(JianYingTemplateDir, draftProjectDir)
  // step2
  generateDraftContent()
  generateDraftMetaInfo()
}
