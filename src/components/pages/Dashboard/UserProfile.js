import { Space } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useQuery } from 'react-query';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export default props => {
  // props
  const { userData } = props;

  /*const { status, data, error } = useQuery('currentUser', () =>
        axiosWithAuth()(`/users/${userData?.userId}`)
    );*/

  const data = {
    name: 'John Jacob',
    orgName: 'Jingleheimer Inc.',
    role: 'chief ninja',
    description:
      'I see a little silhouetto of a john, scaramuche however the song goes',
    imageUrl: 'I am an image.jpg',
    email: 'john@jingleheimer.com',
  };

  // condition for the component to render - this might be because of the state of user data or something else
  function shouldRender() {
    return data;
  }

  return shouldRender() ? (
    <div>
      <Space
        direction="vertical"
        align="center"
        style={{ border: '1px solid black' }}
      >
        <Title level="3">{data.name}</Title>
        <Paragraph>
          {data.role} of {data.orgName}
        </Paragraph>
        <Paragraph>{data.description}</Paragraph>
        <Paragraph>Profile image at {data.imageUrl}</Paragraph>
        <Paragraph>Email: {data.email}</Paragraph>
      </Space>
    </div>
  ) : (
    <></>
  );
};
