import React, { useState, useEffect } from 'react';
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
  Divider,
  List,
  Avatar,
  Spin
} from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const UpdateAdoption = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [adoptionData, setAdoptionData] = useState(null);
  const [allAdoptions, setAllAdoptions] = useState([]);
  const [fetchingAdoptions, setFetchingAdoptions] = useState(false);

  useEffect(() => {
    fetchAllAdoptions();
  }, []);

  const fetchAllAdoptions = async () => {
    setFetchingAdoptions(true);
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`);
      setAllAdoptions(response.data);
    } catch (error) {
      message.error('Failed to fetch adoptions');
      console.error('Error:', error);
    } finally {
      setFetchingAdoptions(false);
    }
  };

  const handleSelectAdoption = (adoption) => {
    setAdoptionData(adoption);
    form.setFieldsValue(adoption);
    message.success(`Selected ${adoption.name} for editing`);
    
    setTimeout(() => {
      const formElement = document.getElementById('edit-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleUpdate = async (values) => {
    if (!adoptionData?._id) {
      message.warning('Please select an adoption first');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_CONFIG.baseURL}/adoption/${adoptionData._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      message.success('Adoption information updated successfully');
      setAdoptionData(response.data);
      fetchAllAdoptions();
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
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Update Adoption Information</Title>
        <p>Select an adoption from the list below to update its information</p>
        
        <Divider />
        
        <Card size="small" style={{ marginBottom: '24px' }}>
          <Title level={4}>Available Adoptions</Title>
          {fetchingAdoptions ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin size="large" />
              <p>Loading adoptions...</p>
            </div>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={allAdoptions}
              renderItem={(adoption) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => handleSelectAdoption(adoption)}
                      disabled={adoptionData && adoptionData._id === adoption._id}
                    >
                      {adoptionData && adoptionData._id === adoption._id ? 'Selected' : 'Select to Edit'}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={adoption.imageUrl} 
                        size={64}
                        shape="square"
                      />
                    }
                    title={adoption.name}
                    description={
                      <div>
                        <p><strong>Breed:</strong> {adoption.breed}</p>
                        <p><strong>Age:</strong> {adoption.age}</p>
                        <p><strong>Status:</strong> {adoption.status}</p>
                        <p><strong>Description:</strong> {adoption.description?.substring(0, 100)}...</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>

        {adoptionData && (
          <Card size="small" style={{ marginTop: '24px' }} id="edit-form">
            <Title level={4}>Update Adoption Information - {adoptionData.name}</Title>
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
      </Card>
    </div>
  );
};

export default UpdateAdoption;

