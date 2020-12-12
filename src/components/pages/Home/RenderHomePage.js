import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { Button } from '../../common';
import { Layout, Typography, Space, Divider } from 'antd';
import SampleItem from '../Dashboard/SampleItem';
import { useQuery } from 'react-query';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const { Paragraph, Title } = Typography;

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const { status, data, error } = useQuery('currentUser', () =>
    axiosWithAuth()('/users/getuserinfo')
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          <SampleItem userData={data} />
          <SampleItem />
        </Space>
      </Layout.Content>
    </Layout>
  );
}
export default RenderHomePage;
