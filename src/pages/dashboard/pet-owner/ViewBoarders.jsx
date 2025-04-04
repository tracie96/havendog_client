import React, { useState, useEffect } from 'react';
import { Card, List, Rate, Tag, Input, Select, Row, Col, Button, Modal, Form, DatePicker, Empty, message } from 'antd';
import { SearchOutlined, StarOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const ViewBoarders = () => {
  const [boarders, setBoarders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedBoarder, setSelectedBoarder] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBoarders();
  }, [searchTerm, petType, sortBy]);

  const fetchBoarders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/boarders', {
        params: {
          search: searchTerm,
          petType,
          sortBy
        }
      });
      if (!response.data) {
        throw new Error('Failed to fetch pet boarders');
      }
      setBoarders(response.data);
    } catch (error) {
      message.error('Failed to fetch pet boarders');
      setBoarders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePetTypeChange = (value) => {
    setPetType(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleBookBoarding = (boarder) => {
    setSelectedBoarder(boarder);
    setIsBookingModalVisible(true);
  };

  const handleBookingSubmit = async (values) => {
    try {
      await axios.post('/api/boarding-bookings', {
        boarderId: selectedBoarder.id,
        ...values
      });
      message.success('Boarding booked successfully');
      setIsBookingModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to book boarding');
    }
  };

  const EmptyBoarders = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          No pet boarders found
          {searchTerm && ` matching "${searchTerm}"`}
          {petType && ` for ${petType}`}
        </span>
      }
    />
  );

  return (
    <div className="p-4">
      <Card>
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={8}>
            <Search placeholder="Search pet boarders" allowClear enterButton={<SearchOutlined />} onSearch={handleSearch} />
          </Col>
          <Col xs={24} sm={8}>
            <Select style={{ width: '100%' }} placeholder="Filter by pet type" onChange={handlePetTypeChange} allowClear>
              <Option value="dog">Dogs</Option>
              <Option value="cat">Cats</Option>
              <Option value="bird">Birds</Option>
              <Option value="small">Small Pets</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Select style={{ width: '100%' }} placeholder="Sort by" defaultValue="rating" onChange={handleSortChange}>
              <Option value="rating">Rating</Option>
              <Option value="rate">Daily Rate</Option>
              <Option value="capacity">Available Capacity</Option>
            </Select>
          </Col>
        </Row>

        <List
          loading={loading}
          grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
          dataSource={boarders}
          locale={{ emptyText: <EmptyBoarders /> }}
          renderItem={(boarder) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <Button type="primary" onClick={() => handleBookBoarding(boarder)}>
                    Book Boarding
                  </Button>
                ]}
              >
                <Card.Meta
                  avatar={<img src={boarder.photo} alt={boarder.name} style={{ width: 64, height: 64, borderRadius: '50%' }} />}
                  title={boarder.name}
                  description={
                    <div>
                      <p>
                        <HomeOutlined /> {boarder.facilityType}
                      </p>
                      <p>
                        <EnvironmentOutlined /> {boarder.location}
                      </p>
                      <div className="mb-2">
                        <Rate disabled defaultValue={boarder.rating} />
                        <span className="ml-2">({boarder.reviews} reviews)</span>
                      </div>
                      <div className="mb-2">
                        <Tag color="blue">Capacity: {boarder.capacity} pets</Tag>
                        <Tag color="green">${boarder.rate}/day</Tag>
                      </div>
                      <div className="mb-2">
                        <p className="font-semibold">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {boarder.amenities?.map((amenity, index) => (
                            <Tag key={index}>{amenity}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={`Book Boarding with ${selectedBoarder?.name}`}
        open={isBookingModalVisible}
        onCancel={() => setIsBookingModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleBookingSubmit}>
          <Form.Item name="petId" label="Select Pet" rules={[{ required: true, message: 'Please select a pet!' }]}>
            <Select placeholder="Select your pet">
              {/* This will be populated with user's pets */}
              <Option value="1">Max (Dog)</Option>
              <Option value="2">Luna (Cat)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="checkInDate" label="Check-in Date" rules={[{ required: true, message: 'Please select check-in date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="checkOutDate" label="Check-out Date" rules={[{ required: true, message: 'Please select check-out date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="specialInstructions" label="Special Instructions">
            <Input.TextArea rows={4} placeholder="Any special care instructions or requirements" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Book Boarding
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewBoarders;
