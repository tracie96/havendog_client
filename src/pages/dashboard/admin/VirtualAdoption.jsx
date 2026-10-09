import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Space, Switch, Table, Typography, message } from 'antd';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title, Text } = Typography;

const naira = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const VirtualAdoptionAdmin = () => {
  const [challengeForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [savingPrice, setSavingPrice] = useState(false);
  const [monthlyFeedPrice, setMonthlyFeedPrice] = useState(3000);
  const [dogs, setDogs] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  const loadOverview = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/virtual-adoption/manage`, {
        headers: authHeaders()
      });
      setMonthlyFeedPrice(response.data.monthlyFeedPrice);
      setDogs(response.data.dogs || []);
      setChallenges(response.data.challenges || []);
      setSponsorships(response.data.sponsorships || []);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to load virtual adoption');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  const savePrice = async () => {
    try {
      setSavingPrice(true);
      await axios.put(
        `${API_CONFIG.baseURL}/virtual-adoption/settings`,
        { monthlyFeedPrice },
        { headers: authHeaders() }
      );
      message.success('Monthly feeding price updated');
      loadOverview();
    } catch (error) {
      message.error(error.response?.data?.message || 'Could not update the price');
    } finally {
      setSavingPrice(false);
    }
  };

  const addChallenge = async (values) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/virtual-adoption/challenges`, values, {
        headers: authHeaders()
      });
      message.success('Challenge added. It is now included in that dog’s price.');
      challengeForm.resetFields();
      loadOverview();
    } catch (error) {
      message.error(error.response?.data?.message || 'Could not add the challenge');
    }
  };

  const toggleChallenge = async (challenge, active) => {
    try {
      await axios.patch(
        `${API_CONFIG.baseURL}/virtual-adoption/challenges/${challenge._id}`,
        { active },
        { headers: authHeaders() }
      );
      loadOverview();
    } catch (error) {
      message.error(error.response?.data?.message || 'Could not update the challenge');
    }
  };

  const removeChallenge = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/virtual-adoption/challenges/${id}`, {
        headers: authHeaders()
      });
      message.success('Challenge removed');
      loadOverview();
    } catch (error) {
      message.error(error.response?.data?.message || 'Could not remove the challenge');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Virtual Adoption</Title>
      <Text type="secondary">
        Every dog starts at the monthly feeding price. A challenge, such as an operation, is added on top for that dog only.
      </Text>

      <Card style={{ marginTop: 16 }} title="Monthly feeding price">
        <Space>
          <InputNumber
            min={1}
            value={monthlyFeedPrice}
            onChange={(value) => setMonthlyFeedPrice(value || 1)}
            formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/₦\s?|(,*)/g, '')}
          />
          <Button type="primary" loading={savingPrice} onClick={savePrice}>
            Save price
          </Button>
        </Space>
      </Card>

      <Card style={{ marginTop: 16 }} title="Add a challenge for one dog">
        <Form form={challengeForm} layout="vertical" onFinish={addChallenge}>
          <Form.Item name="petId" label="Dog" rules={[{ required: true, message: 'Choose a dog' }]}>
            <Select
              placeholder="Select a dog"
              options={dogs.map((dog) => ({
                value: dog._id,
                label: `${dog.name} — currently ${naira(dog.totalPrice)} / month`
              }))}
            />
          </Form.Item>
          <Form.Item name="title" label="Challenge" rules={[{ required: true, message: 'Enter a title' }]}>
            <Input placeholder="Operation, medication, special diet" />
          </Form.Item>
          <Form.Item name="amount" label="Extra amount (NGN)" rules={[{ required: true, message: 'Enter an amount' }]}>
            <InputNumber min={1} style={{ width: '100%' }} placeholder="50000" />
          </Form.Item>
          <Form.Item name="description" label="Note">
            <Input.TextArea rows={2} placeholder="Optional details for the public page" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add challenge
          </Button>
        </Form>
      </Card>

      <Card style={{ marginTop: 16 }} title="Dogs and current monthly price">
        <Table
          loading={loading}
          rowKey="_id"
          dataSource={dogs}
          pagination={false}
          columns={[
            { title: 'Dog', dataIndex: 'name' },
            { title: 'Feeding', dataIndex: 'monthlyFeedPrice', render: naira },
            {
              title: 'Challenges',
              dataIndex: 'challenges',
              render: (items) => (items?.length ? items.map((item) => item.title).join(', ') : 'None')
            },
            { title: 'Total / month', dataIndex: 'totalPrice', render: naira }
          ]}
        />
      </Card>

      <Card style={{ marginTop: 16 }} title="Challenges">
        <Table
          loading={loading}
          rowKey="_id"
          dataSource={challenges}
          pagination={false}
          columns={[
            { title: 'Dog', render: (_, record) => record.pet?.name || 'Removed dog' },
            { title: 'Challenge', dataIndex: 'title' },
            { title: 'Amount', dataIndex: 'amount', render: naira },
            {
              title: 'Active',
              dataIndex: 'active',
              render: (active, record) => (
                <Switch checked={active} onChange={(checked) => toggleChallenge(record, checked)} />
              )
            },
            {
              title: '',
              render: (_, record) => (
                <Button danger onClick={() => removeChallenge(record._id)}>
                  Remove
                </Button>
              )
            }
          ]}
        />
      </Card>

      <Card style={{ marginTop: 16 }} title="Recent virtual adoptions">
        <Table
          loading={loading}
          rowKey="_id"
          dataSource={sponsorships}
          pagination={false}
          columns={[
            { title: 'Supporter', dataIndex: 'supporterName' },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Dog', render: (_, record) => record.pet?.name || 'Dog' },
            { title: 'Paid', dataIndex: 'amount', render: naira },
            {
              title: 'Date',
              dataIndex: 'createdAt',
              render: (date) => (date ? new Date(date).toLocaleDateString() : '')
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default VirtualAdoptionAdmin;
