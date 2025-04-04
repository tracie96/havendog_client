import React, { useState, useEffect } from 'react';
import { Card, List, Avatar, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const response = await axios.get('http://localhost:5000/api/auth/pets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPets(response.data);
    } catch (error) {
      message.error('Failed to fetch pets');
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = () => {
    setEditingPet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    form.setFieldsValue({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      weight: pet.weight,
      pictures: pet.pictures,
      medicalHistory: pet.medicalHistory
    });
    setIsModalVisible(true);
  };

  const handleDeletePet = async (petId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/auth/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      message.success('Pet deleted successfully');
      fetchPets();
    } catch (error) {
      message.error('Failed to delete pet');
      console.error('Error deleting pet:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (editingPet) {
        await axios.put(`http://localhost:5000/api/auth/pets/${editingPet._id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Pet updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/auth/pets', values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Pet added successfully');
      }
      setIsModalVisible(false);
      fetchPets();
    } catch (error) {
      message.error('Failed to save pet');
      console.error('Error saving pet:', error);
    }
  };

  return (
    <div className="p-4">
      <Card
        title="My Pets"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPet}>
            Add Pet
          </Button>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={pets}
          renderItem={(pet) => (
            <List.Item
              actions={[
                <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => handleEditPet(pet)} />,
                <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeletePet(pet._id)} />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={pet.pictures?.[0]} />}
                title={pet.name}
                description={
                  <div>
                    <p>Type: {pet.type}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age} years</p>
                    <p>Weight: {pet.weight} kg</p>
                    <p>Gender: {pet.gender}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal title={editingPet ? 'Edit Pet' : 'Add New Pet'} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Pet Name" rules={[{ required: true, message: 'Please input pet name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Pet Type" rules={[{ required: true, message: 'Please select pet type!' }]}>
            <Select>
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="bird">Bird</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="breed" label="Breed" rules={[{ required: true, message: 'Please input breed!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="age" label="Age (years)" rules={[{ required: true, message: 'Please input age!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item name="weight" label="Weight (kg)" rules={[{ required: true, message: 'Please input weight!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="pictures" label="Pictures">
            <Input.TextArea rows={4} placeholder="Enter picture URLs (one per line)" />
          </Form.Item>

          <Form.Item name="medicalHistory" label="Medical History">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingPet ? 'Update Pet' : 'Add Pet'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyPets;
