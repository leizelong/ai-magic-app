import './index.scss'
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core'
// 引入样式
import '@chatui/core/dist/index.css'
// import axios from 'axios'
const axios = require('axios')
// axios.defaults.adapter = require('axios/lib/adapters/http');

// const model = 'llama2:13b'
const model = 'llama2-chinese'

export function ChatPage() {
  const { messages, appendMsg, setTyping } = useMessages([])

  async function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      const res = await axios.post('http://localhost:11434/api/chat', {
        model: model,
        messages: [
          {
            role: 'user',
            content: val
          }
        ],
        stream: false
      })

      const msg = res.data.message.content

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
