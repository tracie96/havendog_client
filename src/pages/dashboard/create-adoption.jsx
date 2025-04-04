import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Upload, message, Typography } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import HomeHeader from 'menu-items/header';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const CreateAdoption = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

      const response = await axios.post(
        'http://localhost:5000/api/adoptions',
        {
          ...values,
          imageUrl: imageUrl || values.imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      message.success('Adoption listing created successfully!');
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      message.error('Failed to create adoption listing. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    action: 'http://localhost:5000/api/upload', // Replace with your actual upload endpoint
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageUrl(info.file.response.url); // Assuming your API returns the URL in response
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <>
      <HomeHeader />
      <div
        className="pet_care_area"
        style={{
          background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/images/palm-leaves-bg.jpg")',
          backgroundSize: 'cover',
          padding: '40px 0'
        }}
      >
        <div className="container">
          <Card style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
              Create Adoption Listing
            </Title>

            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ age: 1 }}>
              <Form.Item name="name" label="Pet Name" rules={[{ required: true, message: "Please enter the pet's name" }]}>
                <Input />
              </Form.Item>

              <Form.Item name="breed" label="Breed" rules={[{ required: true, message: 'Please enter the breed' }]}>
                <Input />
              </Form.Item>

              <Form.Item name="age" label="Age (years)" rules={[{ required: true, message: 'Please enter the age' }]}>
                <InputNumber min={0} max={20} />
              </Form.Item>

              <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the location' }]}>
                <Input />
              </Form.Item>

              <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Pet Image" required>
                <Upload {...uploadProps} listType="picture-card" maxCount={1} showUploadList={true}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    background: '#FF0080',
                    border: 'none',
                    borderRadius: '8px',
                    height: '40px'
                  }}
                >
                  Create Adoption Listing
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateAdoption;
