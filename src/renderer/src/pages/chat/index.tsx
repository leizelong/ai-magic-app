import './index.scss'
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core'
// 引入样式
import '@chatui/core/dist/index.css'
import { getSettingConfig } from '@renderer/utils/tool'
import axios from 'axios'

export function ChatPage() {
  const { cozeToken } = getSettingConfig()

  const { messages, appendMsg, setTyping } = useMessages([])

  async function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      const res = await axios.post(
        'https://api.coze.com/open_api/v2/chat',
        {
          stream: false,
          bot_id: '7353673363065143304',
          user: 'leizl',
          query: val
        },
        {
          headers: {
            Authorization: `Bearer ${cozeToken}`,
            Accept: '*/*',
            'Content-Type': 'application/json'
          }
        }
      )

      const msg = res.data.messages?.[0]?.content

      appendMsg({
        type: 'text',
        content: { text: msg }
      })
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <div className="chat">
      <Chat
        navbar={{ title: '智能助理' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  )
}
