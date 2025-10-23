import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Select, 
  message, 
  Typography, 
  Row, 
  Col, 
  Space,
  Divider
} from 'antd';
import { SaveOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const UpdateAdoption = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [adoptionData, setAdoptionData] = useState(null);
  const [adoptionId, setAdoptionId] = useState('');

  const handleSearch = async () => {
    if (!adoptionId.trim()) {
      message.warning('Please enter an adoption ID');
      return;
    }

    setSearchLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/adoption/${adoptionId}`);
      
      setAdoptionData(response.data);
      form.setFieldsValue(response.data);
      message.success('Adoption data loaded successfully');
    } catch (error) {
      message.error('Failed to fetch adoption data');
      console.error('Error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    if (!adoptionId.trim()) {
      message.warning('Please enter an adoption ID first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_CONFIG.baseURL}/adoption/${adoptionId}`,
        values,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      message.success('Adoption information updated successfully');
      setAdoptionData(response.data);
    } catch (error) {
      message.error('Failed to update adoption information');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setAdoptionData(null);
    setAdoptionId('');
  };

  return (
    <>
      <HomeHeader />
      <div className="container p-4">
        <Card>
          <Title level={2}>Update Adoption Information</Title>
          <p>Update adoption information using the adoption ID</p>
          
          <Divider />
          
          {/* Search Section */}
          <Card size="small" style={{ marginBottom: '24px' }}>
            <Title level={4}>Search Adoption</Title>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Enter adoption ID (e.g., 64f8a1b2c3d4e5f6a7b8c9d0)"
                  value={adoptionId}
                  onChange={(e) => setAdoptionId(e.target.value)}
                  onPressEnter={handleSearch}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    loading={searchLoading}
                  >
                    Search
                  </Button>
                  <Button onClick={handleReset}>
                    Reset
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Form Section */}
          {adoptionData && (
            <Card size="small">
              <Title level={4}>Update Adoption Information</Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
                initialValues={adoptionData}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Pet Name"
                      rules={[{ required: true, message: 'Please enter pet name' }]}
                    >
                      <Input placeholder="Enter pet name" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="breed"
                      label="Breed"
                      rules={[{ required: true, message: 'Please enter breed' }]}
                    >
                      <Input placeholder="Enter breed" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="age"
                      label="Age"
                      rules={[{ required: true, message: 'Please enter age' }]}
                    >
                      <Input type="number" placeholder="Enter age" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="location"
                      label="Location"
                      rules={[{ required: true, message: 'Please enter location' }]}
                    >
                      <Input placeholder="Enter location" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24}>
                    <Form.Item
                      name="imageUrl"
                      label="Image URL"
                      rules={[
                        { required: true, message: 'Please enter image URL' },
                        { type: 'url', message: 'Please enter a valid URL' }
                      ]}
                    >
                      <Input placeholder="Enter image URL" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24}>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[{ required: true, message: 'Please enter description' }]}
                    >
                      <TextArea 
                        rows={4} 
                        placeholder="Enter pet description" 
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[{ required: true, message: 'Please select status' }]}
                    >
                      <Select placeholder="Select status">
                        <Option value="available">Available</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="adopted">Adopted</Option>
                        <Option value="unavailable">Unavailable</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Divider />
                
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={loading}
                    size="large"
                  >
                    Update Adoption
                  </Button>
                  <Button onClick={handleReset} size="large">
                    Reset Form
                  </Button>
                </Space>
              </Form>
            </Card>
          )}

          {/* Current Data Display */}
          {adoptionData && (
            <Card size="small" style={{ marginTop: '24px' }}>
              <Title level={4}>Current Data</Title>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {JSON.stringify(adoptionData, null, 2)}
              </pre>
            </Card>
          )}
        </Card>
      </div>
      <HomeFooter />
    </>
  );
};

export default UpdateAdoption;

