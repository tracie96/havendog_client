import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, Modal, message, Typography, Space, Descriptions, Divider, Input } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;

const yesNo = (value) => (value ? String(value).replace(/-/g, ' ') : 'N/A');

const SurrenderRequests = () => {
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
      const response = await axios.get(`${API_CONFIG.baseURL}/surrenders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      message.error('Failed to fetch surrender requests');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_CONFIG.baseURL}/surrenders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`Surrender ${status}`);
      setIsModalVisible(false);
      fetchRequests();
    } catch (error) {
      message.error('Failed to update surrender status');
    }
  };

  const filtered = requests.filter((request) => {
    const petName = request.pet?.name || '';
    const ownerName = request.surrenderer?.fullName || '';
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
      title: 'Species',
      key: 'species',
      render: (_, record) =>
        record.pet?.species === 'other' ? record.pet?.speciesOther || 'Other' : yesNo(record.pet?.species)
    },
    {
      title: 'Surrenderer',
      dataIndex: ['surrenderer', 'fullName'],
      key: 'surrenderer'
    },
    {
      title: 'Phone',
      dataIndex: ['surrenderer', 'phone'],
      key: 'phone'
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'accepted' ? 'green' : status === 'declined' ? 'red' : 'orange';
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
        <Title level={2}>Pet Surrender Requests</Title>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search by pet or surrenderer name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 360, marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filtered} loading={loading} rowKey="_id" />
      </Card>

      <Modal
        title="Pet Surrender Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={
          selected?.status === 'pending'
            ? [
                <Button key="decline" danger onClick={() => handleStatusUpdate(selected._id, 'declined')}>
                  Decline
                </Button>,
                <Button key="accept" type="primary" onClick={() => handleStatusUpdate(selected._id, 'accepted')}>
                  Accept
                </Button>
              ]
            : null
        }
      >
        {selected && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Descriptions title="A. Surrenderer" bordered size="small" column={1}>
              <Descriptions.Item label="Full Name">{selected.surrenderer?.fullName}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selected.surrenderer?.phone}</Descriptions.Item>
              <Descriptions.Item label="WhatsApp">{selected.surrenderer?.whatsapp || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Email">{selected.surrenderer?.email}</Descriptions.Item>
              <Descriptions.Item label="Address">{selected.surrenderer?.residentialAddress}</Descriptions.Item>
              <Descriptions.Item label="Occupation">{selected.surrenderer?.occupation || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Next of Kin">{selected.surrenderer?.nextOfKin || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Next of Kin Phone">{selected.surrenderer?.nextOfKinPhone || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Relationship">{selected.surrenderer?.nextOfKinRelationship || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="B. Pet" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.pet?.name}</Descriptions.Item>
              <Descriptions.Item label="Species">
                {selected.pet?.species === 'other' ? selected.pet?.speciesOther : yesNo(selected.pet?.species)}
              </Descriptions.Item>
              <Descriptions.Item label="Breed">{selected.pet?.breed || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Sex">{yesNo(selected.pet?.sex)}</Descriptions.Item>
              <Descriptions.Item label="Age">{selected.pet?.age || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{selected.pet?.dateOfBirth || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Colour / Markings">{selected.pet?.colourMarkings || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Microchip">{selected.pet?.microchipNumber || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Current Location">{selected.pet?.currentLocation || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="C. Reason" bordered size="small" column={1}>
              <Descriptions.Item label="Reasons">
                {(selected.reason?.reasons || []).join(', ') || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Other">{selected.reason?.otherReason || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Explanation">{selected.reason?.explanation || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="D. Medical" bordered size="small" column={1}>
              <Descriptions.Item label="Vaccinated">{yesNo(selected.medical?.vaccinated)}</Descriptions.Item>
              <Descriptions.Item label="Last vaccination">{selected.medical?.lastVaccinationDate || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Rabies">{yesNo(selected.medical?.rabiesVaccinated)}</Descriptions.Item>
              <Descriptions.Item label="Sterilized">{yesNo(selected.medical?.sterilized)}</Descriptions.Item>
              <Descriptions.Item label="Had litter">{yesNo(selected.medical?.hadLitter)}</Descriptions.Item>
              <Descriptions.Item label="Conditions">{selected.medical?.knownConditions || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Medications">{selected.medical?.currentMedications || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Allergies">{selected.medical?.knownAllergies || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Last vet visit">{selected.medical?.lastVetVisit || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Clinic">{selected.medical?.vetClinic || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="E. Behaviour" bordered size="small" column={1}>
              <Descriptions.Item label="Friendly with people">{yesNo(selected.behaviour?.friendlyWithPeople)}</Descriptions.Item>
              <Descriptions.Item label="Friendly with children">{yesNo(selected.behaviour?.friendlyWithChildren)}</Descriptions.Item>
              <Descriptions.Item label="Friendly with dogs">{yesNo(selected.behaviour?.friendlyWithDogs)}</Descriptions.Item>
              <Descriptions.Item label="Friendly with cats">{yesNo(selected.behaviour?.friendlyWithCats)}</Descriptions.Item>
              <Descriptions.Item label="Has bitten">{yesNo(selected.behaviour?.hasBitten)}</Descriptions.Item>
              <Descriptions.Item label="Bite explanation">{selected.behaviour?.biteExplanation || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Fear / anxiety / aggression">{selected.behaviour?.fearAnxietyAggression || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="House-trained">{yesNo(selected.behaviour?.houseTrained)}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="F. Care" bordered size="small" column={1}>
              <Descriptions.Item label="Current food">{selected.care?.currentFood || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Meals per day">{selected.care?.mealsPerDay || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Food restrictions">{selected.care?.foodRestrictions || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Special care">{selected.care?.specialCare || 'N/A'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="G. Declaration" bordered size="small" column={1}>
              <Descriptions.Item label="Name">{selected.declaration?.surrendererName}</Descriptions.Item>
              <Descriptions.Item label="Signature">{selected.declaration?.signature}</Descriptions.Item>
              <Descriptions.Item label="Date">
                {selected.declaration?.date ? new Date(selected.declaration.date).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SurrenderRequests;
