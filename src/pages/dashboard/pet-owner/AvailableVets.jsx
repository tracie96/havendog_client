import React, { useState, useEffect } from 'react';
import { Card, List, Rate, Tag, Button, message } from 'antd';
import { PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const AvailableVets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/vets');
      const data = await response.json();
      setVets(data);
    } catch (error) {
      message.error('Failed to fetch veterinarians');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Available Veterinarians</h2>
      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={vets}
        renderItem={(vet) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img alt={vet.name} src={vet.image || 'https://via.placeholder.com/300x200'} style={{ height: 200, objectFit: 'cover' }} />
              }
            >
              <Card.Meta
                title={vet.name}
                description={
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <Rate disabled defaultValue={vet.rating} />
                      <span style={{ marginLeft: 8 }}>({vet.reviewCount} reviews)</span>
                    </div>
                    <div>
                      <Tag color="blue">{vet.specialization}</Tag>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p>
                        <strong>Experience:</strong> {vet.experience} years
                      </p>
                      <p>
                        <strong>Clinic:</strong> {vet.clinic}
                      </p>
                      <p>
                        <PhoneOutlined /> {vet.phoneNumber}
                      </p>
                      <p>
                        <EnvironmentOutlined /> {vet.address}
                      </p>
                    </div>
                  </div>
                }
              />
              <div style={{ marginTop: 16 }}>
                <Button type="primary" block>
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

export default AvailableVets;
