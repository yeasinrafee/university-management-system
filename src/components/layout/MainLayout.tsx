import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { adminSlideBarItems } from '../../routes/admin.routes';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: 'white',
            height: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h3>University Management</h3>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          items={adminSlideBarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
