import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Button } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 8,
  },
};

const SearchInput = props => {
  const onFinish = values => {
    //Update filterValues state so that the useEffect in SearchPage triggers a rerender
    props.setFilter({ name: values.name, status: values.status });
  };

  return (
    <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name:"
        name="name"
        rules={[
          {
            required: false,
            message: 'Enter name...',
          },
        ]}
      >
        <Input size="small" placeholder="Enter name..." />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Select a status' }]}
      >
        <Radio.Group>
          <Radio value="all">All</Radio>
          <Radio value="not reviewed">Not Reviewed</Radio>
          <Radio value="accepted">Accepted</Radio>
          <Radio value="rejected">Rejected</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchInput;
