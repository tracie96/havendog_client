import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const UpForAdoption = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/adoptions');
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
          <Row gutter={[24, 24]}>
            {pets.map((pet) => (
              <Col xs={24} sm={12} md={8} lg={6} key={pet._id}>
                <Card 
                  hoverable 
                  cover={<img alt={pet.name} src={pet.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                  loading={loading}
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
                        <Text>{pet.description}</Text>
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
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default UpForAdoption;
