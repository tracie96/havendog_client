import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, Modal, message, Typography, Space, Descriptions, Divider, Input } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;

const yesNo = (value) => (value ? String(value) : 'N/A');

const BoardingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.boardingRequests}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      message.error('Failed to fetch boarding requests');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.updateBoardingStatus(id)}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`Boarding request ${status}`);
      setIsModalVisible(false);
      fetchRequests();
    } catch (error) {
      message.error('Failed to update boarding status');
    }
  };

  const filtered = requests.filter((request) => {
    const petName = request.pet?.name || '';
    const ownerName = request.owner?.name || '';
    const query = searchText.trim().toLowerCase();
    return petName.toLowerCase().includes(query) || ownerName.toLowerCase().includes(query);
  });

  const columns = [
    {
      title: 'Pet Name',
      dataIndex: ['pet', 'name'],
      key: 'petName'
    },
    {
      title: 'Breed',
      dataIndex: ['pet', 'breed'],
      key: 'breed'
    },
    {
      title: 'Size',
      dataIndex: ['pet', 'dogSize'],
      key: 'dogSize',
      render: (val) => yesNo(val)
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'name'],
      key: 'owner'
    },
    {
      title: 'Phone',
      dataIndex: ['owner', 'phone'],
      key: 'phone'
    },
    {
      title: 'Check-in',
      dataIndex: ['boarding', 'startDate'],
      key: 'startDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '—')
    },
    {
      title: 'Check-out',
      dataIndex: ['boarding', 'endDate'],
      key: 'endDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '—')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'orange';
        if (status === 'approved' || status === 'completed') color = 'green';
        if (status === 'rejected') color = 'red';
        return <Tag color={color}>{(status || 'pending').toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelected(record);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Boarding Requests</Title>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search by pet or owner name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 360, marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filtered} loading={loading} rowKey="_id" pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="Boarding Request Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={
          selected?.status === 'pending'
            ? [
                <Button key="reject" danger onClick={() => handleStatusUpdate(selected._id, 'rejected')}>
                  Reject
                </Button>,
                <Button key="approve" type="primary" onClick={() => handleStatusUpdate(selected._id, 'approved')}>
                  Approve
                </Button>
              ]
            : null
        }
      >
        {selected && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Descriptions title="Owner" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.owner?.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{selected.owner?.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selected.owner?.phone}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Pet" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.pet?.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{selected.pet?.age ?? 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Breed">{selected.pet?.breed}</Descriptions.Item>
              <Descriptions.Item label="Size">{yesNo(selected.pet?.dogSize)}</Descriptions.Item>
              <Descriptions.Item label="Last vaccinated">{yesNo(selected.pet?.lastVaccinated)}</Descriptions.Item>
              <Descriptions.Item label="On tick medicine">{yesNo(selected.pet?.onTickMedicine)}</Descriptions.Item>
              <Descriptions.Item label="Allergies">{selected.pet?.allergies || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Medications">{selected.pet?.medications || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Feeding">{selected.pet?.feedingInstructions || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Special instructions">{selected.pet?.specialInstructions || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Boarding dates" bordered size="small" column={1}>
              <Descriptions.Item label="Check-in">
                {selected.boarding?.startDate ? new Date(selected.boarding.startDate).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Check-out">
                {selected.boarding?.endDate ? new Date(selected.boarding.endDate).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Emergency contact" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.emergency_contact?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selected.emergency_contact?.phone || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Veterinarian" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.veterinarian?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selected.veterinarian?.phone || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Declaration" bordered size="small" column={1}>
              <Descriptions.Item label="Agreed to terms">{selected.agreedToBoardingTerms ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="Owner's name">{selected.ownerDeclaration?.ownerName || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Signature">{selected.ownerDeclaration?.signature || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Date">
                {selected.ownerDeclaration?.date ? new Date(selected.ownerDeclaration.date).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
            </Descriptions>
            {(selected.documents?.petImages?.length || selected.documents?.vaccinationCard || selected.documents?.medicalRecords) && (
              <>
                <Divider />
                <Descriptions title="Documents" bordered size="small" column={1}>
                  {selected.documents?.vaccinationCard && (
                    <Descriptions.Item label="Vaccination card">
                      <a href={selected.documents.vaccinationCard} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </Descriptions.Item>
                  )}
                  {selected.documents?.medicalRecords && (
                    <Descriptions.Item label="Medical records">
                      <a href={selected.documents.medicalRecords} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </Descriptions.Item>
                  )}
                  {selected.documents?.petImages?.length > 0 && (
                    <Descriptions.Item label="Pet images">
                      {selected.documents.petImages.map((url, index) => (
                        <a key={url} href={url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                          Image {index + 1}
                        </a>
                      ))}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BoardingRequests;
