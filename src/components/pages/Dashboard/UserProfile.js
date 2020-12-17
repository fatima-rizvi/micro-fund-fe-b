import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Button, Space } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export default props => {
  // props
  const { userData } = props;

  // state and queries
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');

  const auth = useOktaAuth();

  const { isLoading, data, error } = useQuery('currentUser', async () =>
    axiosWithAuth(auth.authState.accessToken).get(`/users/getuserinfo`)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(data);
    console.log(data?.data);
    setName(data?.data?.username);
    setDescription(data?.data?.description);
    setImageUrl(data?.data?.imageUrl);
    setEmail(data?.data?.email);
  }, [data]);

  // mutations
  const patchUser = () => {
    console.log(`saving user ${data?.data?.userid}`);
    return axiosWithAuth(
      auth.authState.accessToken
    ).patch(`users/user/${data?.data?.userid}`, {
      username: name,
      description,
      imageUrl,
      userid: data?.data?.userid,
    });
  };

  const mutation = useMutation(patchUser, {
    onSuccess: () => {
      // when user data is successfully edited, inform the query client that its cached result is no longer valid
      queryClient.invalidateQueries('currentUser');
    },
  });

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

    console.log('yay, you were saved');

    try {
      mutation.mutate();
    } catch (error) {}
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
        <Title level={2}>
          {data.role} of {data.orgName}
        </Title>
        <Paragraph editable={{ onChange: setDescription }}>
          {description}
        </Paragraph>
        <Paragraph editable={{ onChange: setImageUrl }}>{imageUrl}</Paragraph>
        <Paragraph editable={{ onChange: setEmail }}>{email}</Paragraph>
        <Button
          disabled={!shouldSaveChanges()}
          onClick={saveChanges}
          loading={mutation.isLoading}
        >
          Save Changes
        </Button>
      </Space>
    </div>
  ) : (
    <></>
  );
};
