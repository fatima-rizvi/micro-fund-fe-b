import { Button, Space } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export default props => {
  // props
  const { userData } = props;

  // state and queries
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');

  /*const { status, data, error } = useQuery('currentUser', () =>
        axiosWithAuth()(`/users/${userData?.userId}`)
    );*/

  const [data, setData] = useState({
    name: 'John Jacob',
    orgName: 'Jingleheimer Inc.',
    role: 'chief ninja',
    description:
      'I see a little silhouetto of a john, scaramuche however the song goes',
    imageUrl: 'I am an image.jpg',
    email: 'john@jingleheimer.com',
  });

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setImageUrl(data.imageUrl);
    setEmail(data.email);
  }, [data]);

  // condition for the component to render - this might be because of the state of user data or something else
  function shouldRender() {
    return data;
  }

  // returns true if the local state is different from the most recent profile query, i.e., the user has entered data
  function shouldSaveChanges() {
    return (
      name !== data.name ||
      description !== data.description ||
      imageUrl !== data.imageUrl ||
      email !== data.email
    );
  }

  function saveChanges() {
    if (!shouldSaveChanges()) return;
    // add mutation here
    console.log('yay, you were saved');
  }

  return shouldRender() ? (
    <div>
      <Space
        direction="vertical"
        align="center"
        style={{ border: '1px solid black' }}
      >
        <Title level={3} editable={{ onChange: setName }}>
          {name}
        </Title>
        <Paragraph>
          {data.role} of {data.orgName}
        </Paragraph>
        <Paragraph editable={{ onChange: setDescription }}>
          {description}
        </Paragraph>
        <Paragraph editable={{ onChange: setImageUrl }}>{imageUrl}</Paragraph>
        <Paragraph editable={{ onChange: setEmail }}>{email}</Paragraph>
        <Button disabled={!shouldSaveChanges()} onClick={saveChanges}>
          Save Changes
        </Button>
      </Space>
    </div>
  ) : (
    <></>
  );
};
