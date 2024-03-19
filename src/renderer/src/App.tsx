import Versions from './components/Versions'
import icons from './assets/icons.svg'
import { getVideoInfo } from './utils/videoInfo'
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { SearchPage } from './pages/search'
import { KeyframesPage } from './pages/keyframes'
import { VideoDownload } from './pages/video-download'
import { Setting } from './pages/setting'

type MenuItem = Required<MenuProps>['items'][number]

const menus: MenuItem[] = [
  { label: <Link to="/download">视频下载</Link>, key: 'download' },
  { label: <Link to="/remove-water">去水印</Link>, key: 'remove-water' },
  {
    label: <Link to="/keyframes">一键创作</Link>,
    key: 'keyframes'
  },
  { label: <Link to="/setting">设置</Link>, key: 'setting' }
]

function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>AI 一键创作</h1>
      </Header>
      <HashRouter>
        <Layout hasSider className="site-layout">
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" items={menus} />
          </Sider>
          <Content style={{ padding: 16 }}>
            <Routes>
              <Route path="/" Component={KeyframesPage} />
              <Route path="/download" Component={VideoDownload} />
              <Route path="/keyframes" Component={KeyframesPage} />
              <Route path="/setting" Component={Setting} />
            </Routes>
          </Content>
        </Layout>
      </HashRouter>
    </Layout>
  )
}

export default App
