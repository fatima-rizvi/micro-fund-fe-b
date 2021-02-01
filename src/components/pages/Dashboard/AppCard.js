import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useOrgQuery, useMutationToPostApp } from '../../../hooks';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Form, Input, Row, Col, Button, Typography, Divider } from 'antd';
const { Title } = Typography;

function AppCard() {
  const { orgid } = useParams();
  const auth = useOktaAuth();
  // grab the org name
  const { isLoading, data, error } = useOrgQuery(auth, orgid)[0];
  const [orgName, setOrgName] = useState('');
  // setup mutation to post appData
  const mutation = useMutationToPostApp(auth);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    address: '',
    reason: '',
    // throwing in orgid so the relationships setup correctly
    // when the data is submitted to the back-end
    organization: { orgid },
  });
  useEffect(() => {
    if (!isLoading && !error) {
      setOrgName(data.data.name);
    }
  }, [data]);

  const handleChanges = e => {
    let name = e.target.name;
    let value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    mutation.mutate(formState);
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
        <Form {...layout}>
          <Form.Item
            label="Full Name: "
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              name="name"
              value={formState.name}
              onChange={handleChanges}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            label="Phone Number: "
            rules={[
              { required: true, message: 'Please include your phone number!' },
            ]}
          >
            <Input
              name="phone"
              value={formState.phone}
              onChange={handleChanges}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input
              name="address"
              value={formState.address}
              onChange={handleChanges}
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item
            label="Please Describe the Reason you want to join."
            rules={[
              {
                required: true,
                message: 'Please describe your reason for wishing to join!',
              },
            ]}
          >
            <Input.TextArea
              name="reason"
              value={formState.reason}
              onChange={handleChanges}
              placeholder="Reason"
              autoSize={{ minRows: 7 }}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={onSubmit} type="primary">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AppCard;
