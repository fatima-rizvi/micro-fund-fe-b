import React from 'react';
import styled from 'styled-components';
import {
  PageHeader,
  Button,
  Descriptions,
  Collapse,
  Card,
  Col,
  Row,
} from 'antd';

// Styles
const HeaderStyle = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: lightgrey;
`;

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

function Header(props) {
  const { authService } = props;

  return (
    <HeaderStyle>
      <h3>My Info</h3>
      <Collapse ghost="true" onChange={callback}>
        <Panel>
          <div className="site-page-header-ghost-wrapper">
            <PageHeader
              ghost={false}
              title="Organization Name"
              subTitle="org_id"
              extra={[<Button key="3">Edit</Button>]}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="name">
                  Anthony Navarro
                </Descriptions.Item>
                <Descriptions.Item label="phone_number">
                  <a>555-0210</a>
                </Descriptions.Item>
                <Descriptions.Item label="email">
                  organization@mail.com
                </Descriptions.Item>
                <Descriptions.Item label="Effective Time">
                  2017-10-10
                </Descriptions.Item>
                <Descriptions.Item label="address">
                  123 street Somewhere, California
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </div>
        </Panel>
      </Collapse>
    </HeaderStyle>
  );
}

export default Header;
