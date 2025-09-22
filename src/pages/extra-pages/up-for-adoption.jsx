import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
import Loader from '../../components/Loader';

const { Title, Text } = Typography;

const UpForAdoption = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/adoptions`);
        if (response.data && Array.isArray(response.data)) {
          setPets(response.data);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handlePetClick = (petId) => {
    navigate(`/pet-details/${petId}`);
  };

  if (loading) {
    return (
      <>
        <HomeHeader />
        <Loader />
        <div className="p-4">
          <div className="text-center mb-6">
            <Title level={2}>
              <HeartOutlined className="mr-2" />
              Pets Up for Adoption
            </Title>
          </div>
          <div className="container">
            <div className="text-center py-8">
              <Spin size="large" />
              <div className="mt-4">
                <Text>Loading adorable pets...</Text>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HomeHeader />
      <div className="p-4">
        <div className="text-center mb-6">
          <Title level={2}>
            <HeartOutlined className="mr-2" />
            Pets Up for Adoption
          </Title>
        </div>

        <div className="container">
          {pets.length === 0 ? (
            <div className="text-center py-8">
              <Title level={3}>No pets available for adoption at the moment</Title>
              <Text>Check back later for new pets!</Text>
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {pets.map((pet) => (
                <Col xs={24} sm={12} md={8} lg={6} key={pet._id}>
                  <Card 
                    hoverable 
                    cover={<img alt={pet.name} src={pet.imageUrl} style={{ height: 400, objectFit: 'cover' }} />}
                    onClick={() => handlePetClick(pet._id)}
                  >
                    <Card.Meta
                      title={pet.name}
                      description={
                        <Space direction="vertical" size="small">
                          <Text>
                            {pet.breed}
                          </Text>
                          <Text>Age: {pet.age}</Text>
                          <Text>{truncateText(pet.description, 30)}</Text>
                          <Button type="primary" block>
                            Learn More
                          </Button>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default UpForAdoption;
