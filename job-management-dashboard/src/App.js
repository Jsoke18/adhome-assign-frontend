/**
 * Main application component.
 * @returns {JSX.Element} The rendered application.
 */

import React from 'react';
import { Layout, Typography } from 'antd';
import 'antd/dist/reset.css';
import JobPage from './pages/JobTable/JobPage';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529', padding: '0 20px' }}>
        <Title level={3} style={{ color: 'white', lineHeight: '64px', margin: 0 }}>
          Job Management Dashboard
        </Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <JobPage />
      </Content>
      <Footer style={{ textAlign: 'center' }}>©Joshua Soke's Assignment</Footer>
    </Layout>
  );
};

export default App;
