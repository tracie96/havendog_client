import React, { useState, useEffect } from 'react';
import { Card, List, Rate, Tag, Input, Select, Row, Col, Button, message, Empty } from 'antd';
import { EnvironmentOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const ViewVets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchVets();
  }, [searchTerm, specialization, sortBy]);

  const fetchVets = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch(`/api/vets?search=${searchTerm}&specialization=${specialization}&sort=${sortBy}`);
      if (!response.ok) {
        throw new Error('Failed to fetch veterinarians');
      }
      const data = await response.json();
      setVets(data);
    } catch (error) {
      message.error('Failed to fetch veterinarians');
      setVets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (vetId) => {
    // TODO: Implement booking functionality
    message.info('Booking appointment...');
  };

  const EmptyVets = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          No veterinarians found
          {searchTerm && ` matching "${searchTerm}"`}
          {specialization && ` in ${specialization}`}
        </span>
      }
    />
  );

  return (
    <div className="p-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} md={8}>
          <Search placeholder="Search veterinarians" allowClear onSearch={setSearchTerm} style={{ width: '100%' }} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select placeholder="Filter by specialization" style={{ width: '100%' }} onChange={setSpecialization} allowClear>
            <Option value="general">General Practice</Option>
            <Option value="surgery">Surgery</Option>
            <Option value="dermatology">Dermatology</Option>
            <Option value="dentistry">Dentistry</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select placeholder="Sort by" style={{ width: '100%' }} onChange={setSortBy} defaultValue="rating">
            <Option value="rating">Rating</Option>
            <Option value="experience">Experience</Option>
            <Option value="distance">Distance</Option>
          </Select>
        </Col>
      </Row>

      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
        dataSource={vets}
        locale={{ emptyText: <EmptyVets /> }}
        renderItem={(vet) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <div className="p-4">
                  <img
                    alt={vet.name}
                    src={vet.image || 'https://via.placeholder.com/150'}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold">{vet.name}</h3>
                <p className="text-gray-600">{vet.clinic}</p>
                <div className="my-2">
                  <Rate disabled defaultValue={vet.rating} />
                  <span className="ml-2">({vet.reviews} reviews)</span>
                </div>
                <div className="flex justify-center gap-2 my-2">
                  <Tag color="blue">{vet.specialization}</Tag>
                  <Tag color="green">{vet.experience} years experience</Tag>
                </div>
                <div className="text-left my-2">
                  <p>
                    <EnvironmentOutlined /> {vet.location}
                  </p>
                  <p>
                    <ClockCircleOutlined /> {vet.availability}
                  </p>
                  <p>
                    <StarOutlined /> ${vet.rate}/consultation
                  </p>
                </div>
                <Button type="primary" onClick={() => handleBookAppointment(vet._id)} className="mt-4">
                  Book Appointment
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewVets;
