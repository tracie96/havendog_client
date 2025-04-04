import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Button, message, Tabs } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [boardingBookings, setBoardingBookings] = useState([]);
  const [vetBookings, setVetBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // TODO: Replace with actual API calls
      const [boardingResponse, vetResponse] = await Promise.all([fetch('/api/bookings/boarding'), fetch('/api/bookings/vet')]);

      const boardingData = await boardingResponse.json();
      const vetData = await vetResponse.json();

      setBoardingBookings(boardingData);
      setVetBookings(vetData);
    } catch (error) {
      message.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, type) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/bookings/${bookingId}/cancel`, { method: 'POST' });
      message.success('Booking cancelled successfully');
      fetchBookings(); // Refresh bookings
    } catch (error) {
      message.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      case 'completed':
        return 'blue';
      default:
        return 'default';
    }
  };

  const renderBoardingBookings = () => (
    <List
      loading={loading}
      dataSource={boardingBookings}
      renderItem={(booking) => (
        <List.Item>
          <Card style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>{booking.petName}</h3>
                <p>
                  <strong>Boarder:</strong> {booking.boarderName}
                </p>
                <p>
                  <CalendarOutlined /> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p>
                  <EnvironmentOutlined /> {booking.location}
                </p>
                <p>
                  <strong>Rate:</strong> ${booking.rate}/day
                </p>
              </div>
              <div>
                <Tag color={getStatusColor(booking.status)}>{booking.status}</Tag>
                {booking.status === 'pending' && (
                  <Button danger onClick={() => handleCancelBooking(booking.id, 'boarding')} style={{ marginTop: 8 }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const renderVetBookings = () => (
    <List
      loading={loading}
      dataSource={vetBookings}
      renderItem={(booking) => (
        <List.Item>
          <Card style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>{booking.petName}</h3>
                <p>
                  <strong>Veterinarian:</strong> {booking.vetName}
                </p>
                <p>
                  <CalendarOutlined /> {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <ClockCircleOutlined /> {booking.time}
                </p>
                <p>
                  <strong>Type:</strong> {booking.appointmentType}
                </p>
                <p>
                  <EnvironmentOutlined /> {booking.clinicName}
                </p>
              </div>
              <div>
                <Tag color={getStatusColor(booking.status)}>{booking.status}</Tag>
                {booking.status === 'pending' && (
                  <Button danger onClick={() => handleCancelBooking(booking.id, 'vet')} style={{ marginTop: 8 }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div>
      <h2>My Bookings</h2>
      <Tabs defaultActiveKey="boarding">
        <TabPane tab="Boarding Bookings" key="boarding">
          {renderBoardingBookings()}
        </TabPane>
        <TabPane tab="Veterinary Appointments" key="vet">
          {renderVetBookings()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyBookings;
