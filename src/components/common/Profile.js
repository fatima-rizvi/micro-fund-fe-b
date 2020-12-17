import React, { useState } from 'react';
import styled from 'styled-components';
import {
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Tag,
  Typography,
  Row,
  Collapse,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useEffect } from 'react';

// Styles
const ProfileStyle = styled.div`
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: #fafafa;
`;

const { Panel } = Collapse;
const { Paragraph } = Typography;

//dummy data - will be replacing with actual API data once back-end is set up.
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

//dummy data - will be replacing with actual API data once back-end is set up.
const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: 'none',
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top',
        }}
      />
    </Button>
  </Dropdown>
);

//dummy data - will be replacing with actual API data once back-end is set up.
const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
];

const IconLink = ({ src, text }) => (
  <a>
    <img src={src} alt={text} />
    {text}
  </a>
);

//dummy data - will be replacing with actual API data once back-end is set up.
// const content = (
//   <>
//     <Paragraph>
//       {' '}
//       <p>userInput_id</p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl
//       eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a
//       bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
//       tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti
//       sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
//       Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia
//       quis posuere ut, pulvinar vitae dolor.
//     </Paragraph>

//     <div>
//       <IconLink
//         src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
//         text="email_id"
//       />
//       <p></p>
//       <IconLink
//         src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
//         text="company_id"
//       />
//     </div>
//   </>
// );

const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

function callback(key) {
  console.log(key);
}

const defaultUserData = {
  username: 'guest',
  userid: -1,
  description: '',
  role: 'guest',
  orgid: -1,
  orgName: 'no organization',
  imageUrl: '',
  email: '',
};

function Profile() {
  // query
  const auth = useOktaAuth();
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery('currentUser', () => {
    console.log(auth.authState.accessToken);
    return axiosWithAuth(auth.authState.accessToken).get('/users/getuserinfo');
  });

  // transfer results of query into local state (for editable fields)
  const [userData, setUserData] = useState(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(data?.data);
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  // mutation
  const patchUser = () => {
    return axiosWithAuth(auth.authState.accessToken).patch(
      `users/user/${userData.userid}`,
      userData
    );
  };

  const mutation = useMutation(patchUser, {
    onSuccess: () => {
      // when user data is successfully changed, notify query client that it should refetch user data
      queryClient.invalidateQueries('currentUser');
    },
  });

  // event handlers
  const editDescription = text => {
    setUserData({ ...userData, description: text });
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const submitUserData = () => {
    mutation.mutate();
  };

  return (
    <ProfileStyle>
      <h4>{userData.username}'s profile</h4>
      <Collapse ghost="true" onChange={callback}>
        <Panel>
          <PageHeader
            title={userData.role}
            className="site-page-header"
            subTitle={userData.orgName ?? 'no organization'}
            tags={<Tag color="blue">Actively Funding</Tag>}
            extra={[
              <Button key="1" type="primary" onClick={toggleIsEditing}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>,
              <Button key="2" type="primary" onClick={submitUserData}>
                Save
              </Button>,
              <DropdownMenu key="more" />,
            ]}
            avatar={{
              src: userData.imageUrl
                ? userData.imageUrl
                : 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
            }}
            breadcrumb={{ routes }}
          >
            <Content
              extraContent={
                <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                  alt="content"
                  width="100%"
                />
              }
            >
              <Paragraph
                editable={isEditing ? { onChange: editDescription } : false}
              >
                {userData.description}
              </Paragraph>
              <div>
                <IconLink
                  src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                  text={userData.email ?? 'no email'}
                />
              </div>
              <div>
                <IconLink
                  src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                  text={userData.orgName ?? 'no organization'}
                />
              </div>
            </Content>
          </PageHeader>
        </Panel>
      </Collapse>
    </ProfileStyle>
  );
}

export default Profile;
