import React from 'react';
import style from 'styled-components';
import { Table, Badge, Menu, Dropdown, Space, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

//Styles
const MyUsersCardStyle = style.div`

  box-shadow: 2px 2px 2px grey;
  background: #fafafa;
  margin: 10px;
  padding: 10px; 
`;

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function callback(key) {
  console.log(key);
}
// User Profile Populated below
function MyUsersCard() {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Applicant', dataIndex: 'app_id', key: 'app_id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="processing" />
            Pending
          </span>
        ),
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>View</a>
            <Dropdown overlay={menu}>
              <a>
                More
                <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 4; ++i) {
      data.push({
        key: i,
        app_id: 'app_id',
        name: 'name_id',
        email: 'email_id',
        date: 'date_id',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Partner', dataIndex: 'name', key: 'name' },
    { title: 'Name', dataIndex: 'creator', key: 'creator' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date Created', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Status',
      key: 'state',
      render: () => (
        <span>
          <Badge status="success" />
          Active
        </span>
      ),
    },
    { title: 'Action', key: 'operation', render: () => <a>View</a> },
  ];

  const data = [];
  for (let i = 0; i < 1; ++i) {
    data.push({
      key: i,
      name: 'partner_id',
      email: 'email_id',
      creator: 'name_id',
      createdAt: 'date_id',
    });
  }

  return (
    <MyUsersCardStyle>
      <h4>user_id partners</h4>
      <Collapse accordian="true" ghost="true" onChange={callback}>
        <Panel>
          <Table
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
          />
        </Panel>
      </Collapse>
    </MyUsersCardStyle>
  );
}

export default MyUsersCard;
