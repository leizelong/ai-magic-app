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

type MenuItem = Required<MenuProps>['items'][number]

const menus: MenuItem[] = [
  { label: <Link to="/search">Download</Link>, key: 'search' },
  {
    label: <Link to="/keyframes">keyframes</Link>,
    key: 'keyframes'
  }
]

function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>YouTube Downloader</h1>
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
              <Route path="/search" Component={SearchPage} />
              <Route path="/keyframes" Component={KeyframesPage} />
            </Routes>
          </Content>
        </Layout>
      </HashRouter>
    </Layout>
  )
}

export default App
