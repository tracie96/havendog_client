import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Spin, Modal, List, Segmented } from 'antd';
import { HeartOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import HavenSiteHeader from 'components/HavenSiteHeader';
import HomeFooter from './footer';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
import Loader from '../../components/Loader';
import { formatPetAge } from '../../utils/formatPetAge';
import './up-for-adoption.css';

const { Title, Text } = Typography;

const UpForAdoption = () => {
  const [availablePets, setAvailablePets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('available');
  const navigate = useNavigate();

  const truncateText = (text, maxWords) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.trim().split(/\s+/);
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`;
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
    <article
      key={pet._id}
      className="pet-card"
      onClick={() => handlePetClick(pet._id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handlePetClick(pet._id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={`pet-card-cover${adopted ? ' is-adopted' : ''}`}>
        <img alt={pet.name} src={pet.imageUrl} loading="lazy" />
        {adopted && (
          <span className="pet-card-tag">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#52c41a',
                color: '#fff',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 700
              }}
            >
              <CheckCircleOutlined /> Adopted
            </span>
          </span>
        )}
      </div>
      <div className="pet-card-body">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-meta">
          {pet.breed || 'Mixed'} · Age: {formatPetAge(pet.age)}
        </p>
        <p className="pet-card-desc">{truncateText(pet.description, 28)}</p>
        <button
          type="button"
          className={`pet-card-btn ${adopted ? 'secondary' : 'primary'}`}
          onClick={(event) => {
            event.stopPropagation();
            handlePetClick(pet._id);
          }}
        >
          {adopted ? 'View Pet' : 'Adopt Now'}
        </button>
      </div>
    </article>
  );

  const renderPetGrid = (pets, adopted = false, emptyTitle, emptySubtitle) => {
    if (pets.length === 0) {
      return (
        <div className="adoption-empty">
          <h2>{emptyTitle}</h2>
          <p>{emptySubtitle}</p>
        </div>
      );
    }

    return <div className="adoption-grid">{pets.map((pet) => renderPetCard(pet, adopted))}</div>;
  };

  const tipsForFutureParents = [
    {
      title: 'Neutering/Spaying',
      description:
        'Neutering or spaying your pet is required before final adoption. This helps control the pet population and provides health benefits including reduced risk of certain cancers and behavioral improvements.'
    },
    {
      title: 'Veterinary Care',
      description:
        "Schedule a wellness check-up with a veterinarian within the first week of adoption. Ensure your pet is up-to-date on vaccinations and discuss a preventive care plan."
    },
    {
      title: 'Pet-Proofing Your Home',
      description:
        'Remove toxic plants, secure electrical cords, and ensure windows and doors are secure. Create a safe space where your pet can retreat when needed.'
    },
    {
      title: 'Nutrition & Feeding',
      description:
        "Provide high-quality pet food appropriate for your pet's age, size, and health needs. Establish a regular feeding schedule and avoid overfeeding."
    },
    {
      title: 'Exercise & Mental Stimulation',
      description:
        'Regular exercise is essential for physical and mental health. Provide toys, puzzles, and daily activities to keep your pet engaged and happy.'
    },
    {
      title: 'Training & Socialization',
      description:
        'Start training early with positive reinforcement. Socialize your pet gradually with people, other animals, and new environments to build confidence.'
    },
    {
      title: 'Identification & Microchipping',
      description:
        'Ensure your pet has proper identification tags and consider microchipping. Keep contact information updated in case your pet gets lost.'
    },
    {
      title: 'Grooming & Hygiene',
      description:
        'Establish a regular grooming routine including brushing, nail trimming, and dental care. This helps maintain health and strengthens your bond.'
    },
    {
      title: 'Emergency Preparedness',
      description:
        'Have a pet first-aid kit ready and know the location of the nearest emergency veterinary clinic. Keep important documents and medical records accessible.'
    },
    {
      title: 'Patience & Commitment',
      description:
        'Adjustment periods vary. Be patient as your pet adapts to their new home. Remember, adoption is a lifelong commitment that requires time, love, and resources.'
    }
  ];

  if (loading) {
    return (
      <>
        <HavenSiteHeader />
        <Loader />
        <div className="adoption-page">
          <div className="adoption-inner">
            <div className="adoption-hero">
              <h1>
                <HeartOutlined className="heart" />
                Pets Up for Adoption
              </h1>
            </div>
            <div className="adoption-empty">
              <Spin size="large" />
              <p style={{ marginTop: 16 }}>Loading adorable pets...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HavenSiteHeader />
      <div className="adoption-page">
        <div className="adoption-inner">
          <div className="adoption-hero">
            <h1>
              <HeartOutlined className="heart" />
              Pets Up for Adoption
            </h1>
            <Button
              type="default"
              className="adoption-tips-btn"
              icon={<InfoCircleOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Tips for Future Parents
            </Button>
          </div>

          <div className="adoption-tabs">
            <span className="adoption-tabs-hint">Tap to browse pets</span>
            <Segmented
              size="large"
              value={activeTab}
              onChange={setActiveTab}
              block
              options={[
                {
                  value: 'available',
                  label: (
                    <Space size={6}>
                      <HeartOutlined />
                      <span>Available ({availablePets.length})</span>
                    </Space>
                  )
                },
                {
                  value: 'adopted',
                  label: (
                    <Space size={6}>
                      <CheckCircleOutlined />
                      <span>Adopted ({adoptedPets.length})</span>
                    </Space>
                  )
                }
              ]}
            />
          </div>

          {activeTab === 'available' ? (
            renderPetGrid(
              availablePets,
              false,
              'No pets available for adoption at the moment',
              'Check back later for new pets!'
            )
          ) : (
            <>
              {adoptedPets.length > 0 && (
                <p className="adoption-note">
                  These wonderful pets have found their forever homes.
                </p>
              )}
              {renderPetGrid(
                adoptedPets,
                true,
                'No adopted pets to show yet',
                'Happy tails will appear here once pets find their homes.'
              )}
            </>
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
          <div
            style={{
              backgroundColor: '#fff7e6',
              border: '2px solid #ffa940',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px'
            }}
          >
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
              renderItem={(item) => (
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
