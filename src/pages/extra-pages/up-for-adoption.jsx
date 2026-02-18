import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Spin, Modal, List } from 'antd';
import { HeartOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
  const [modalVisible, setModalVisible] = useState(true);
  const navigate = useNavigate();
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const formatAge = (months) => {
    if (!months && months !== 0) return 'Age unknown';
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  };
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/adoptions`);
        if (response.data && Array.isArray(response.data)) {
          // Filter out adopted pets - don't show pets with status "adopted" or isAdopted: true
          const availablePets = response.data.filter(pet => 
            pet.status !== 'adopted' && !pet.isAdopted
          );
          setPets(availablePets);
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

  const tipsForFutureParents = [
    {
      title: 'Neutering/Spaying',
      description: 'Neutering or spaying your pet is required before final adoption. This helps control the pet population and provides health benefits including reduced risk of certain cancers and behavioral improvements.',
    },
    {
      title: 'Veterinary Care',
      description: 'Schedule a wellness check-up with a veterinarian within the first week of adoption. Ensure your pet is up-to-date on vaccinations and discuss a preventive care plan.',
    },
    {
      title: 'Pet-Proofing Your Home',
      description: 'Remove toxic plants, secure electrical cords, and ensure windows and doors are secure. Create a safe space where your pet can retreat when needed.',
    },
    {
      title: 'Nutrition & Feeding',
      description: 'Provide high-quality pet food appropriate for your pet\'s age, size, and health needs. Establish a regular feeding schedule and avoid overfeeding.',
    },
    {
      title: 'Exercise & Mental Stimulation',
      description: 'Regular exercise is essential for physical and mental health. Provide toys, puzzles, and daily activities to keep your pet engaged and happy.',
    },
    {
      title: 'Training & Socialization',
      description: 'Start training early with positive reinforcement. Socialize your pet gradually with people, other animals, and new environments to build confidence.',
    },
    {
      title: 'Identification & Microchipping',
      description: 'Ensure your pet has proper identification tags and consider microchipping. Keep contact information updated in case your pet gets lost.',
    },
    {
      title: 'Grooming & Hygiene',
      description: 'Establish a regular grooming routine including brushing, nail trimming, and dental care. This helps maintain health and strengthens your bond.',
    },
    {
      title: 'Emergency Preparedness',
      description: 'Have a pet first-aid kit ready and know the location of the nearest emergency veterinary clinic. Keep important documents and medical records accessible.',
    },
    {
      title: 'Patience & Commitment',
      description: 'Adjustment periods vary. Be patient as your pet adapts to their new home. Remember, adoption is a lifelong commitment that requires time, love, and resources.',
    },
  ];

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
          <Button 
            type="default" 
            icon={<InfoCircleOutlined />} 
            onClick={() => setModalVisible(true)}
            style={{ marginBottom: '16px' }}
          >
            Tips for Future Parents
          </Button>
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
                          <Text>Age: {formatAge(pet.age)}</Text>
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
      <Modal
        title={
          <Space>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
            <span>Important Information for Future Pet Parents</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setModalVisible(false)}>
            Got it!
          </Button>
        ]}
        width={700}
      >
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            backgroundColor: '#fff7e6', 
            border: '2px solid #ffa940', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '24px' 
          }}>
            <Title level={4} style={{ color: '#ff4d4f', marginBottom: '16px' }}>
              ⚠️ Mandatory Requirements:
            </Title>
            <div style={{ marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '16px', color: '#d4380d' }}>
                1. Neutering/Spaying is COMPULSORY with our vets before handout is completed.
              </Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '16px', color: '#d4380d' }}>
                2. Only applicants located in Lagos are allowed to adopt.
              </Text>
            </div>
            <div>
              <Text strong style={{ fontSize: '16px', color: '#d4380d' }}>
                3. Our pets must NOT sleep outside of the house or in a cage outside.
              </Text>
            </div>
          </div>
          <div style={{ marginTop: '24px' }}>
            <Title level={4}>Essential Tips for Future Pet Parents:</Title>
            <List
              itemLayout="vertical"
              dataSource={tipsForFutureParents}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                    title={<Text strong>{item.title}</Text>}
                    description={<Text>{item.description}</Text>}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
      <HomeFooter />
    </>
  );
};

export default UpForAdoption;
