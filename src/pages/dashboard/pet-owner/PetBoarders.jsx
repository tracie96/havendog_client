import React, { useState, useEffect } from 'react';
import { Card, List, Rate, Tag, Button, message } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, DollarOutlined } from '@ant-design/icons';

const PetBoarders = () => {
  const [boarders, setBoarders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoarders();
  }, []);

  const fetchBoarders = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/boarders');
      const data = await response.json();
      setBoarders(data);
    } catch (error) {
      message.error('Failed to fetch pet boarders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Available Pet Boarders</h2>
      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={boarders}
        renderItem={(boarder) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={boarder.name}
                  src={boarder.image || 'https://via.placeholder.com/300x200'}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={boarder.name}
                description={
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <Rate disabled defaultValue={boarder.rating} />
                      <span style={{ marginLeft: 8 }}>({boarder.reviewCount} reviews)</span>
                    </div>
                    <div>
                      <Tag color="blue">Experience: {boarder.experience} years</Tag>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p>
                        <DollarOutlined /> Rate: ${boarder.rate}/day
                      </p>
                      <p>
                        <PhoneOutlined /> {boarder.phoneNumber}
                      </p>
                      <p>
                        <EnvironmentOutlined /> {boarder.location}
                      </p>
                      <p>Available for: {boarder.petTypes.join(', ')}</p>
                      <p>Max pets: {boarder.maxPets}</p>
                    </div>
                  </div>
                }
              />
              <div style={{ marginTop: 16 }}>
                <Button type="primary" block>
                  Request Booking
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PetBoarders;
