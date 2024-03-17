import { Button, Form, Input, message } from 'antd'

import './index.scss'
import { useForm } from 'antd/es/form/Form'
import { fs, path } from '@renderer/utils/module'
import { execCommand } from '@renderer/utils/common'
import { getMedia } from '@renderer/utils/viode'

export function VideoDownload() {
  const [form] = useForm()

  function getTitleByShareUrl(str: string) {
    const res = str.match(/.*(https)/)
    if (res && res[0]) {
      // 删除后面的 'https'
      const text = res[0].replace(/https$/, '')
      // 匹配并提取中文字符串
      const title = text?.match(/[\u4e00-\u9fa5]+/g)?.join(',')
      return title
    }
    return ''
  }

  const handleDownload = async () => {
    const values = await form.validateFields()
    const regex = /(https?:\/\/[^\s]+)/g
    const result = values.url.match(regex)
    const shareUrl = result?.[0]
    const title = getTitleByShareUrl(values.url)
    debugger
    try {
      if (!shareUrl) {
        throw new Error('没有找到https链接')
      }
      const mediaUrl = await getMedia(shareUrl)
      const downloadDir = path.join(process.cwd(), 'download')
      const fileName = `${values.name || title || 'download'}.mp4`
      const filePath = path.join(downloadDir, fileName)
      // 确保目标目录存在，如果不存在则创建
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true })
      }
      // if (fs.existsSync(filePath)) {
      //   message.error(`${filePath} already exists`)
      //   return
      // }
      await execCommand('ffmpeg', [
        '-i',
        mediaUrl,
        '-y',
        '-c',
        'copy',
        // 'test.mp4',
        filePath
      ])
      message.success('下载成功')
    } catch (error: any) {
      message.error(error.message)
    }
  }

  return (
    <div className="search-page" style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 30 }}>
        <Form form={form}>
          <Form.Item
            rules={[{ required: true, message: '不能为空' }]}
            required
            label="抖音分享链接"
            name={'url'}
          >
            <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 6 }}></Input.TextArea>
          </Form.Item>
          <Form.Item
            // rules={[{ required: true, message: '不能为空' }]}
            label="视频名称"
            name={'name'}
          >
            <Input allowClear></Input>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Button type="primary" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  )
}
