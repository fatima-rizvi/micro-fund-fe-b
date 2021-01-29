import React, { useState, useEffect } from 'react';
// import {} from "antd";
import ReactDOM from 'react-dom';
import { Form, Input, Button, Select, Space, Radio } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SearchInput = () => {
  const [form] = Form.useForm();

  const [radioValue, setRadioValue] = React.useState('');

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  const onSearch = value => console.log(value);

  const onFinish = values => {
    console.log('onFinish: ', values);
    // console.log(radioValue);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      name: 'Hello world!',
      status: 'interesting',
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Search
          placeholder="input name"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Radio.Group onChange={onChange} value={radioValue}>
          <Radio value={'pending'}>Pending</Radio>
          <Radio value={'accepted'}>Accepted</Radio>
          <Radio value={'rejected'}>Rejected</Radio>
        </Radio.Group>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchInput;
