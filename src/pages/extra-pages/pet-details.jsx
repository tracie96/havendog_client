import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Form, Input, message, Space } from 'antd';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';

const { Text } = Typography;

const PetDetails = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/adoptions/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet:', error);
        message.error('Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/interests`, {
        petId: id,
        interestedUser: {
          name: values.name,
          email: values.email,
          phone: values.phone
        },
        message: values.message
      });
      message.success('Interest submitted successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting interest:', error);
      message.error('Failed to submit interest');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <>
      <HomeHeader />
      <div className="container p-4">
        <Button onClick={() => navigate(-1)} className="mb-4">
          Back to List
        </Button>
        
        <div className="row">
          <div className="col-md-6">
            <Card
              cover={<img alt={pet.name} src={pet.imageUrl} style={{ height: 400, objectFit: 'cover' }} />}
            >
              <Card.Meta
                title={pet.name}
                description={
                  <Space direction="vertical" size="small">
                    <Text>
                      <strong>Breed:</strong> {pet.breed}
                    </Text>
                    <Text>
                      <strong>Age:</strong> {pet.age}
                    </Text>
                    <Text>
                      <strong>Location:</strong> {pet.location}
                    </Text>
                    <Text>
                      <strong>Description:</strong> {pet.description}
                    </Text>
                    {/* <Text type="secondary">
                      Posted by: {pet.postedBy?.firstName} {pet.postedBy?.lastName}
                    </Text> */}
                  </Space>
                }
              />
            </Card>
          </div>
          
          <div className="col-md-6">
            <Card title="Express Interest">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="name"
                  label="Your Name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please input your message!' }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit Interest
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default PetDetails; 