import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Upload, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;
const { TextArea } = Input;

const CreateAdoption = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'havendogs');

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/tracysoft/image/upload`, formData);
      return response.data.secure_url;
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const adoptionData = {
        ...values,
        imageUrl: imageUrl || values.imageUrl
      };

      await axios.post(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`, adoptionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      message.success('Pet adoption listing created successfully!');
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      console.error('Error creating adoption:', error);
      message.error(error.response?.data?.message || 'Failed to create adoption listing');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
      message.success('Image uploaded successfully');
      return false; // Prevent default upload
    } catch (error) {
      message.error('Failed to upload image');
      return false;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Create Adoption Listing</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '800px' }}
        >
          <Form.Item
            name="name"
            label="Pet Name"
            rules={[{ required: true, message: 'Please enter pet name!' }]}
          >
            <Input size="large" placeholder="Enter pet name" />
          </Form.Item>

          <Form.Item
            name="breed"
            label="Breed"
            rules={[{ required: true, message: 'Please enter breed!' }]}
          >
            <Input size="large" placeholder="Enter breed" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age (in months)"
            rules={[{ required: true, message: 'Please enter age!' }]}
          >
            <InputNumber size="large" min={0} style={{ width: '100%' }} placeholder="Enter age in months" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location!' }]}
          >
            <Input size="large" placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea rows={4} placeholder="Enter pet description" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Pet Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              beforeUpload={handleImageUpload}
              listType="picture-card"
              maxCount={1}
              showUploadList={true}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="pet" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Create Adoption Listing
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateAdoption;

