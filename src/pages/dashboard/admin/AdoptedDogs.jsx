import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, message, Typography, Space, Avatar, Modal, Descriptions, Button } from 'antd';
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';
import { formatPetAge } from '../../../utils/formatPetAge';

const { Title, Text } = Typography;

const AdoptedDogs = () => {
  const [adoptedDogs, setAdoptedDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDog, setSelectedDog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAdoptedDogs();
  }, []);

  const fetchAdoptedDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`);
      const adopted = response.data.filter(
        (pet) => pet.status === 'adopted' || pet.isAdopted === true
      );
      setAdoptedDogs(adopted);
    } catch (error) {
      message.error('Failed to fetch adopted dogs');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDog = (record) => {
    setSelectedDog(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (url, record) => (
        <Avatar src={url} size={48} shape="square">
          {record.name?.charAt(0)}
        </Avatar>
      ),
    },
    {
      title: 'Pet Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age) => formatPetAge(age),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Adopter',
      dataIndex: 'adopterName',
      key: 'adopterName',
      render: (name) => name || '—',
    },
    {
      title: 'Phone',
      dataIndex: 'adopterPhone',
      key: 'adopterPhone',
      render: (phone) => phone || '—',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => <Tag color="green" icon={<CheckCircleOutlined />}>ADOPTED</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDog(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Adopted Dogs</Title>
        <Text type="secondary">
          Pets that have been placed in their forever homes, with adopter contact details.
        </Text>

        <Table
          style={{ marginTop: 24 }}
          columns={columns}
          dataSource={adoptedDogs}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          locale={{ emptyText: 'No adopted dogs yet' }}
        />
      </Card>

      <Modal
        title={selectedDog ? `${selectedDog.name} — Adoption Details` : 'Adoption Details'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={640}
      >
        {selectedDog && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Pet Name">{selectedDog.name}</Descriptions.Item>
            <Descriptions.Item label="Breed">{selectedDog.breed}</Descriptions.Item>
            <Descriptions.Item label="Age">{formatPetAge(selectedDog.age)}</Descriptions.Item>
            <Descriptions.Item label="Location">{selectedDog.location}</Descriptions.Item>
            <Descriptions.Item label="Adopter Name">
              {selectedDog.adopterName || 'Not recorded'}
            </Descriptions.Item>
            <Descriptions.Item label="Adopter Phone">
              {selectedDog.adopterPhone || 'Not recorded'}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedDog.description || '—'}
            </Descriptions.Item>
            {selectedDog.imageUrl && (
              <Descriptions.Item label="Photo">
                <img
                  src={selectedDog.imageUrl}
                  alt={selectedDog.name}
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                />
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default AdoptedDogs;
