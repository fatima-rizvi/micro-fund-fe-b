import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useOrgQuery, useMutationToPostApp } from '../../../hooks';
import { Form, Input, Row, Col, Button, Typography, Divider } from 'antd';
const { Title } = Typography;

function AppCard() {
  const { orgid } = useParams();
  const history = useHistory();
  const auth = useOktaAuth();
  const [{ isLoading, data, error }] = useOrgQuery(auth, orgid);
  const [orgName, setOrgName] = useState('');
  useEffect(() => {
    if (!isLoading && !error) {
      setOrgName(data.data.name);
    }
  }, [data]);

  // seems to work without this, but all examples use it
  const [form] = Form.useForm();

  // setup mutation to post
  const mutation = useMutationToPostApp(auth);

  // use mutation to post form data
  const onFinish = (values: any) => {
    console.log(values);
    mutation.mutate({ ...values, organization: { orgid } });
    history.push('/');
  };

  const layout = {
    layout: 'vertical',
    size: 'large',
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Title>Apply to {orgName}</Title>
        <Divider />
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            label="Full Name: "
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Your Full Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number: "
            rules={[{ required: true }]}
            name="phone"
          >
            <Input placeholder="Your Phone Number" />
          </Form.Item>
          <Form.Item
            label="Address"
            rules={[{ required: true, message: 'Please input your address!' }]}
            name="address"
          >
            <Input placeholder="Your Home Address" />
          </Form.Item>
          <Form.Item
            label="Describe the Reason you want to join."
            rules={[
              {
                required: true,
                message: 'Please describe your reason for wishing to join!',
              },
            ]}
            name="reason"
          >
            <Input.TextArea
              autoSize={{ minRows: 7 }}
              placeholder="please take some time to describe the reasons you are applying."
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AppCard;
