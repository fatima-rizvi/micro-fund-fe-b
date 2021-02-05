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
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { useUserQuery } from '../../hooks';
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
  //const queryClient = useQueryClient();
  const [{ isLoading, data, error }, mutation] = useUserQuery(useOktaAuth());
  console.log(data);
  //const { isLoading, data, error } = useUserInfo(auth);

  // transfer results of query into local state (for editable fields)
  const [userData, setUserData] = useState(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(data?.data);
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  //const mutation = useTheMutation(auth);

  // event handlers
  const editDescription = text => {
    setUserData({ ...userData, description: text });
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const submitUserData = userData => {
    mutation.mutate(userData);
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
              <Button
                key="2"
                type="primary"
                onClick={() => submitUserData(userData)}
              >
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
