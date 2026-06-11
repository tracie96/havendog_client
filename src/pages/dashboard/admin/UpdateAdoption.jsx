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
  Spin,
  Upload
} from 'antd';
import { SaveOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';
import { formatPetAge } from '../../../utils/formatPetAge';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const UpdateAdoption = () => {
  const [form] = Form.useForm();
  const status = Form.useWatch('status', form);
  const [loading, setLoading] = useState(false);
  const [adoptionData, setAdoptionData] = useState(null);
  const [allAdoptions, setAllAdoptions] = useState([]);
  const [fetchingAdoptions, setFetchingAdoptions] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'havendogs');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/tracysoft/image/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
      form.setFieldsValue({ imageUrl: url });
      message.success('Image uploaded successfully');
      return false;
    } catch (error) {
      return false;
    }
  };

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
    setImageUrl(adoption.imageUrl || '');
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
        `${API_CONFIG.baseURL}/adoptions/${adoptionData._id}`,
        { ...values, imageUrl: imageUrl || values.imageUrl },
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
      const errorMessage = error.response?.data?.message || 'Failed to update adoption information';
      message.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setAdoptionData(null);
    setImageUrl('');
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
                        <p><strong>Age:</strong> {formatPetAge(adoption.age)}</p>
                        <p><strong>Status:</strong> {adoption.status}</p>
                        {adoption.status === 'adopted' && adoption.adopterName && (
                          <p><strong>Adopted by:</strong> {adoption.adopterName} ({adoption.adopterPhone})</p>
                        )}
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
                    label="Age (in months)"
                    rules={[{ required: true, message: 'Please enter age in months' }]}
                  >
                    <Input type="number" min={0} placeholder="e.g. 36 for 36 months" />
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
                    label="Pet Image"
                    rules={[{ required: true, message: 'Please upload a pet image' }]}
                  >
                    <Upload
                      beforeUpload={handleImageUpload}
                      listType="picture-card"
                      maxCount={1}
                      showUploadList={false}
                      accept="image/*"
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt="pet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
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

                {status === 'adopted' && (
                  <>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="adopterName"
                        label="Adopter Name"
                        rules={[{ required: true, message: 'Please enter the adopter\'s name' }]}
                      >
                        <Input placeholder="Full name of who adopted this pet" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="adopterPhone"
                        label="Adopter Phone Number"
                        rules={[{ required: true, message: 'Please enter the adopter\'s phone number' }]}
                      >
                        <Input placeholder="Phone number of who adopted this pet" />
                      </Form.Item>
                    </Col>
                  </>
                )}
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

