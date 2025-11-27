import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { createAdmin, clearError } from 'store/slices/authSlice';

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const adminData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber || ''
      };

      console.log('Admin Creation Data:', adminData);

      await dispatch(createAdmin(adminData)).unwrap();
      message.success('Admin account created successfully!');
      form.resetFields(); // Reset form to allow creating another admin
    } catch (err) {
      console.error('Admin Creation Error:', err);
      message.error(err.message || 'Failed to create admin account');
    }
  };

  return (
    <Card 
      className="w-full border-none" 
      style={{ 
        padding: '16px',
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish} 
        onValuesChange={() => dispatch(clearError())}
        style={{ width: '100%' }}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input size="large" placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input size="large" placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input size="large" placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password size="large" placeholder="Enter password (min 6 characters)" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
        >
          <Input size="large" placeholder="Enter phone number (optional)" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            block
            style={{ 
              backgroundColor: '#FF0080', 
              borderColor: '#FF0080',
              height: '48px',
              marginTop: '16px'
            }}
          >
            Create Admin Account
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminRegister;

