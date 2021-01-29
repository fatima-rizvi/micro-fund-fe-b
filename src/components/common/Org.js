import React from 'react';
import { useUserQuery } from '../../hooks';
import { Button, Typography, Divider, Space } from 'antd';

const { Title, Paragraph } = Typography;

export default function Org(props) {
  const { orgData } = props;
  return (
    <>
      <Button type="text" href={`/org/${orgData.orgid}`}>
        <Title level={2}>{orgData.name}</Title>
      </Button>
      <Divider />
      <Space direction="vertical">
        <Button
          type="link"
          href={`https://maps.google.com/?q=${orgData.address}`}
          target="_blank"
        >
          {orgData.address}
        </Button>
        <Button type="link" href={`tel:${orgData.phone}`}>
          {orgData.phone}
        </Button>
        <Button size="large" type="primary" href={`/AppCard/${orgData.orgid}`}>
          Apply
        </Button>
        {orgData.description.split('\n').map((pg, i) => (
          <Paragraph key={i} ellipses="true">
            {pg}
          </Paragraph>
        ))}
      </Space>
    </>
  );
}
