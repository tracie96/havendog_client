import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Spin, Modal, List, Tag, Tabs } from 'antd';
import { HeartOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
import Loader from '../../components/Loader';
import { formatPetAge } from '../../utils/formatPetAge';

const { Title, Text } = Typography;

const UpForAdoption = () => {
  const [availablePets, setAvailablePets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
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

  const isPetAdopted = (pet) => pet.status === 'adopted' || pet.isAdopted;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/adoptions`);
        if (response.data && Array.isArray(response.data)) {
          setAvailablePets(response.data.filter((pet) => !isPetAdopted(pet)));
          setAdoptedPets(response.data.filter((pet) => isPetAdopted(pet)));
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

  const renderPetCard = (pet, adopted = false) => (
    <Col xs={24} sm={12} md={8} lg={6} key={pet._id}>
      <Card
        hoverable
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt={pet.name}
              src={pet.imageUrl}
              style={{
                height: 400,
                objectFit: 'cover',
                ...(adopted && { filter: 'grayscale(25%)' })
              }}
            />
            {adopted && (
              <Tag
                color="success"
                icon={<CheckCircleOutlined />}
                style={{ position: 'absolute', top: 12, right: 12, fontSize: 14, padding: '4px 12px' }}
              >
                Adopted
              </Tag>
            )}
          </div>
        }
        onClick={() => handlePetClick(pet._id)}
      >
        <Card.Meta
          title={pet.name}
          description={
            <Space direction="vertical" size="small">
              <Text>{pet.breed}</Text>
              <Text>Age: {formatPetAge(pet.age)}</Text>
              <Text>{truncateText(pet.description, 30)}</Text>
              <Button type={adopted ? 'default' : 'primary'} block>
                {adopted ? 'View Pet' : 'Learn More'}
              </Button>
            </Space>
          }
        />
      </Card>
    </Col>
  );

  const renderPetGrid = (pets, adopted = false, emptyTitle, emptySubtitle) => {
    if (pets.length === 0) {
      return (
        <div className="text-center py-8">
          <Title level={3}>{emptyTitle}</Title>
          <Text>{emptySubtitle}</Text>
        </div>
      );
    }

    return (
      <Row gutter={[24, 24]}>
        {pets.map((pet) => renderPetCard(pet, adopted))}
      </Row>
    );
  };

  const tabItems = [
    {
      key: 'available',
      label: (
        <span>
          <HeartOutlined /> Available ({availablePets.length})
        </span>
      ),
      children: renderPetGrid(
        availablePets,
        false,
        'No pets available for adoption at the moment',
        'Check back later for new pets!'
      ),
    },
    {
      key: 'adopted',
      label: (
        <span>
          <CheckCircleOutlined /> Adopted ({adoptedPets.length})
        </span>
      ),
      children: (
        <>
          {adoptedPets.length > 0 && (
            <div className="text-center mb-4">
              <Text type="secondary">
                These wonderful pets have found their forever homes.
              </Text>
            </div>
          )}
          {renderPetGrid(
            adoptedPets,
            true,
            'No adopted pets to show yet',
            'Happy tails will appear here once pets find their homes.'
          )}
        </>
      ),
    },
  ];

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
          <Tabs
            defaultActiveKey="available"
            centered
            size="large"
            items={tabItems}
            style={{ marginBottom: 24 }}
          />
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
