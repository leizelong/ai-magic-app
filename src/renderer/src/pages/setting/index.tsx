// import ConfigModel from '@renderer/mongodb/schemas/config'
import { Button, Form, FormItemProps, Input, Space, message } from 'antd'
import { useEffect } from 'react'
import { getSettingConfig, updateSettingConfig } from '@renderer/utils/tool'

export function Setting() {
  const [form] = Form.useForm()
  const fields: FormItemProps[] = [{ label: '工作区路径', name: 'workspacePath' }]

  useEffect(() => {
    async function fetch() {
      const data = getSettingConfig()
      form.setFieldsValue(data)
    }
    fetch()
  }, [])

  async function onSave() {
    const values = await form.validateFields()
    updateSettingConfig(values)
    message.success('保存成功')
  }

  return (
    <Form form={form} style={{ width: 600 }}>
      {fields.map((field) => {
        return (
          <Form.Item {...field}>
            <Input placeholder="工作区路径"></Input>
          </Form.Item>
        )
      })}

      <Space>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
      </Space>
    </Form>
  )
}
