import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import { Layout, Typography, Space, Divider } from 'antd';

const { Paragraph, Title } = Typography;

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <Layout>
      <Layout.Header>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Space size="large" split={<Divider type="vertical" />}>
            <Title>Microfund</Title>
            <Paragraph>{userInfo.name}</Paragraph>
            <Paragraph>
              <Link to="/">Dashboard</Link>
            </Paragraph>
            <Paragraph>
              <Link onClick={() => authService.logout()}>Log Out</Link>
            </Paragraph>
          </Space>
        </Space>
      </Layout.Header>
      <Layout.Content>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Paragraph>
            Replace this paragraph with a dashboard component.
          </Paragraph>
          <Paragraph>
            Replace this paragraph with a dashboard component.
          </Paragraph>
          <Paragraph>
            Replace this paragraph with a dashboard component.
          </Paragraph>
          <Paragraph>
            Replace this paragraph with a dashboard component.
          </Paragraph>
          <Paragraph>
            Replace this paragraph with a dashboard component.
          </Paragraph>
        </Space>
      </Layout.Content>
    </Layout>
  );
}
export default RenderHomePage;
