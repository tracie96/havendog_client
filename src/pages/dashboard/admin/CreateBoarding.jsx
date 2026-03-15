import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker, message, Typography } from 'antd';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;

const CreateBoarding = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const payload = {
        nameOfBreed: values.nameOfBreed,
        ownerInformation: {
          name: values.ownerName,
          email: values.ownerEmail,
          phone: values.ownerPhone
        },
        priceAgreed: values.priceAgreed,
        checkInDate: (values.checkInDate?.toDate?.() || values.checkInDate).toISOString(),
        checkoutDate: (values.checkoutDate?.toDate?.() || values.checkoutDate).toISOString()
      };

      await axios.post(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.boarders}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      message.success('Boarding record created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating boarding:', error);
      message.error(error.response?.data?.message || 'Failed to create boarding record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Create Boarding</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '600px' }}
        >
          <Form.Item
            name="nameOfBreed"
            label="Name of breed"
            rules={[{ required: true, message: 'Please enter breed name!' }]}
          >
            <Input size="large" placeholder="e.g. Labrador Retriever" />
          </Form.Item>

          <Title level={5} style={{ marginTop: 16 }}>Owner information</Title>
          <Form.Item
            name="ownerName"
            label="Owner name"
            rules={[{ required: true, message: 'Please enter owner name!' }]}
          >
            <Input size="large" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="ownerEmail"
            label="Owner email"
            rules={[
              { required: true, message: 'Please enter owner email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input size="large" type="email" placeholder="email@example.com" />
          </Form.Item>
          <Form.Item
            name="ownerPhone"
            label="Owner phone"
            rules={[{ required: true, message: 'Please enter owner phone!' }]}
          >
            <Input size="large" placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            name="priceAgreed"
            label="Price agreed on"
            rules={[{ required: true, message: 'Please enter agreed price!' }]}
          >
            <InputNumber
              size="large"
              min={0}
              step={0.01}
              style={{ width: '100%' }}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>

          <Form.Item
            name="checkInDate"
            label="Check-in date"
            rules={[{ required: true, message: 'Please select check-in date!' }]}
          >
            <DatePicker size="large" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="checkoutDate"
            label="Check-out date"
            rules={[{ required: true, message: 'Please select check-out date!' }]}
          >
            <DatePicker size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              Create boarding
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateBoarding;
