import React from 'react';
import { useUserQuery } from '../../hooks';
import { Button, Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

export default function Org(props) {
  const { orgData } = props;
  return (
    <>
      <Title level={1}>{orgData.name}</Title>
      <Button
        type="link"
        href={`https://maps.google.com/?q=${orgData.address}`}
        target="_blank"
      >
        {orgData.address}
      </Button>
      <br />
      <Button type="link" href={`tel:${orgData.phone}`}>
        {orgData.phone}
      </Button>
      <br />
      <Button size="large" type="primary">
        Apply
      </Button>
      <Divider />
      {orgData.description.split('\n').map((pg, i) => (
        <Paragraph key={i} ellipses="true">
          {pg}
        </Paragraph>
      ))}
    </>
  );
}
