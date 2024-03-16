import { Button, Form, Input, message } from 'antd'

import './index.scss'
import { useForm } from 'antd/es/form/Form'
import { fs, path } from '@renderer/utils/module'
import { execCommand } from '@renderer/utils/common'

export function VideoDownload() {
  const handleDownload = async () => {
    const values = await form.validateFields()
    const downloadDir = path.join(process.cwd(), 'download')
    const fileName = `${values.name}.mp4`
    const filePath = path.join(downloadDir, fileName)
    // 确保目标目录存在，如果不存在则创建
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true })
    }
    // if (fs.existsSync(filePath)) {
    //   message.error(`${filePath} already exists`)
    //   return
    // }
    try {
      await execCommand('ffmpeg', [
        '-i',
        values.url,
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
  const [form] = useForm()

  return (
    <div className="search-page" style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 30 }}>
        <Form form={form}>
          <Form.Item
            rules={[{ required: true, message: '不能为空' }]}
            required
            label="视频链接"
            name={'url'}
          >
            <Input allowClear></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '不能为空' }]}
            required
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
