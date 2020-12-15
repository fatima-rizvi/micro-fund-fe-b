import React from 'react';
import style from 'styled-components';
// import { Collapse } from 'antd';
import { Collapse, Card, Col, Row } from 'antd';
const { Panel } = Collapse;

//Styles
const MyUsersCardStyle = style.div`

  box-shadow: 2px 2px 2px grey;
  background: lightgrey;
  margin: 10px;
  padding: 10px; 
`;

function callback(key) {
  console.log(key);
}

function MyUsersCard() {
  return (
    <MyUsersCardStyle>
      <h3>My Partners</h3>
      <Collapse ghost="true" onChange={callback}>
        <Panel>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Partner Data Populate" bordered={false}>
                  Partner data will be generated here.
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Partner Data Populate" bordered={false}>
                  Partner data will be generated here.
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Partner Data Populate" bordered={false}>
                  Partner data will be generated here.
                </Card>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </MyUsersCardStyle>
  );
}

export default MyUsersCard;
