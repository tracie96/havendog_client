import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, message } from 'antd';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title } = Typography;

const Boarders = () => {
  const [boarders, setBoarders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoarders();
  }, []);

  const fetchBoarders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.boarders}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBoarders(response.data);
    } catch (error) {
      message.error('Failed to fetch boarders');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Dog name',
      dataIndex: 'dogName',
      key: 'dogName',
      render: (val) => val ?? '—'
    },
    {
      title: 'Breed',
      dataIndex: 'nameOfBreed',
      key: 'nameOfBreed'
    },
    {
      title: 'Owner name',
      key: 'ownerName',
      render: (_, record) => record.ownerInformation?.name ?? '—'
    },
    {
      title: 'Owner email',
      key: 'ownerEmail',
      render: (_, record) => record.ownerInformation?.email ?? '—'
    },
    {
      title: 'Owner phone',
      key: 'ownerPhone',
      render: (_, record) => record.ownerInformation?.phone ?? '—'
    },
    {
      title: 'Price agreed/day',
      dataIndex: 'priceAgreed',
      key: 'priceAgreed',
      render: (val) => (val != null ? `$${Number(val).toFixed(2)}` : '—')
    },
    {
      title: 'Check-in',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '—')
    },
    {
      title: 'Check-out',
      dataIndex: 'checkoutDate',
      key: 'checkoutDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '—')
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Boarders</Title>
        <Table
          columns={columns}
          dataSource={boarders}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Boarders;
