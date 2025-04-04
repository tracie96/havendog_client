import React from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import HomeHeader from 'menu-items/header';

const { Title, Text } = Typography;

const UpForAdoption = () => {
  const pets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Mixed Breed',
      age: '3 years',
      image: '/images/dog1.jpg', // You'll need to add these images to your public folder
      description: 'Sweet and gentle mixed breed looking for a forever home.'
    },
    {
      id: 2,
      name: 'Shadow',
      type: 'Dog',
      breed: 'Terrier Mix',
      age: '2 years',
      image: '/images/dog2.jpg',
      description: 'Energetic and friendly terrier mix who loves to play.'
    },
    {
      id: 3,
      name: 'Luna',
      type: 'Dog',
      breed: 'Mixed Breed',
      age: '1 year',
      image: '/images/dog3.jpg',
      description: 'Adorable puppy with lots of love to give.'
    },
    {
      id: 4,
      name: 'Max',
      type: 'Dog',
      breed: 'Mixed Breed',
      age: '4 years',
      image: '/images/dog4.jpg',
      description: 'Friendly and well-behaved dog seeking a loving family.'
    }
  ];

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
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <HeartOutlined style={{ color: '#FF0080', marginRight: '10px' }} />
            Pets Looking for Forever Homes
          </Title>

          <Row gutter={[24, 24]}>
            {pets.map((pet) => (
              <Col xs={24} sm={12} md={8} lg={6} key={pet.id}>
                <Card
                  hoverable
                  className="pet-card"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                  cover={
                    <div
                      style={{
                        position: 'relative',
                        height: '300px',
                        background: '#f5f5f5',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        alt={pet.name}
                        src={pet.image}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(255, 0, 128, 0.8)',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          color: 'white'
                        }}
                      >
                        {pet.age}
                      </div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={<span style={{ fontSize: '18px', color: '#333' }}>{pet.name}</span>}
                    description={
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text strong>{pet.breed}</Text>
                        <Text>{pet.description}</Text>
                        <Button
                          type="primary"
                          block
                          style={{
                            background: '#FF0080',
                            border: 'none',
                            borderRadius: '8px',
                            marginTop: '10px'
                          }}
                        >
                          Meet {pet.name}
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
    </>
  );
};

export default UpForAdoption;
