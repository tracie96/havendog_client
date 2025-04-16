import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, Modal, message, Typography, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';

const { Title } = Typography;

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  const fetchAdoptionRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_CONFIG.baseURL}/adoptions/requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(response.data);
    } catch (error) {
      message.error('Failed to fetch adoption requests');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_CONFIG.baseURL}/adoptions/requests/${requestId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      message.success('Request status updated successfully');
      fetchAdoptionRequests();
    } catch (error) {
      message.error('Failed to update request status');
      console.error('Error:', error);
    }
  };

  const columns = [
    {
      title: 'Pet Name',
      dataIndex: ['petId', 'name'],
      key: 'petName',
    },
    {
      title: 'Pet Breed',
      dataIndex: ['petId', 'breed'],
      key: 'petBreed',
    },
    {
      title: 'Requester',
      dataIndex: ['interestedUser', 'name'],
      key: 'requester',
    },
    {
      title: 'Email',
      dataIndex: ['interestedUser', 'email'],
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: ['interestedUser', 'phone'],
      key: 'phone',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        switch (status) {
          case 'pending':
            color = 'orange';
            break;
          case 'approved':
            color = 'green';
            break;
          case 'rejected':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewRequest(record)}
          >
            View
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                onClick={() => handleStatusUpdate(record._id, 'approved')}
              >
                Approve
              </Button>
              <Button
                danger
                onClick={() => handleStatusUpdate(record._id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <HomeHeader />
      <div className="container p-4">
        <Card>
          <Title level={2}>Adoption Requests</Title>
          <Table
            columns={columns}
            dataSource={requests}
            loading={loading}
            rowKey="_id"
          />
        </Card>

        <Modal
          title="Request Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedRequest && (
            <div>
              <h3>Pet Information</h3>
              <p><strong>Name:</strong> {selectedRequest.petId?.name}</p>
              <p><strong>Breed:</strong> {selectedRequest.petId?.breed}</p>
              
              <h3>Requester Information</h3>
              <p><strong>Name:</strong> {selectedRequest.interestedUser?.name}</p>
              <p><strong>Email:</strong> {selectedRequest.interestedUser?.email}</p>
              <p><strong>Phone:</strong> {selectedRequest.interestedUser?.phone}</p>
              
              <h3>Request Details</h3>
              <p><strong>Message:</strong></p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedRequest.message}</p>
              <p><strong>Date Submitted:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> <Tag color={selectedRequest.status === 'pending' ? 'orange' : selectedRequest.status === 'approved' ? 'green' : 'red'}>{selectedRequest.status.toUpperCase()}</Tag></p>
            </div>
          )}
        </Modal>
      </div>
      <HomeFooter />
    </>
  );
};

export default AdoptionRequests; 