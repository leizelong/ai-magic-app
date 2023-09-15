import Versions from './components/Versions'
import icons from './assets/icons.svg'
import { getVideoInfo } from './utils/videoInfo'
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { SearchPage } from './pages/search'

getVideoInfo('https://youtu.be/mmUfZt10b6g')

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const menus: MenuItem[] = [
  { label: 'Search', key: 'Search' },
  { label: 'Downloading', key: 'Downloading' },
  { label: 'Downloaded', key: 'Downloaded' }
]

function App(): JSX.Element {
  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5')
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />)
  ]
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>YouTube Downloader</h1>
      </Header>

      <Layout hasSider className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" items={menus} />
        </Sider>
        <Content style={{ margin: '0 16px' }}>
          {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div> */}
          <HashRouter>
            <Routes>
              <Route
                path="/"
                // Component={SearchPage}
                element={<SearchPage></SearchPage>}
              />
            </Routes>
          </HashRouter>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  )
}

export default App
