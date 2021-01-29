import React, { useState, useEffect } from 'react';
// import {} from "antd";
import ReactDOM from 'react-dom';

import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

//   const normFile = (e) => {
//     console.log('Upload event:', e);

//     if (Array.isArray(e)) {
//       return e;
//     }

//     return e && e.fileList;
//   };

const SearchInput = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      // initialValues={{
      //   ['input-number']: 3,
      //   ['checkbox-group']: ['A', 'B'],
      //   rate: 3.5,
      // }}
    >
      {/* <Form.Item label="Plain Text">
          <span className="ant-form-text">Filter applications:</span>
        </Form.Item> */}
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

      <Form.Item name="radio-group" label="Status">
        <Radio.Group>
          <Radio value="pending">Pending</Radio>
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
