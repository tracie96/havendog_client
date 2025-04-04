import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, DatePicker } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const AddPet = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'havendogs');

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/tracysoft/image/upload`, formData);
      return response.data.secure_url;
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Upload images to Cloudinary if they exist
      const pictures = [];
      if (values.photo?.fileList) {
        for (const file of values.photo.fileList) {
          const url = await uploadToCloudinary(file.originFileObj);
          pictures.push(url);
        }
      }

      // Format medical history entries
      const medicalHistory =
        values.medicalHistory?.map((entry) => ({
          condition: entry.condition,
          diagnosis: entry.diagnosis,
          treatment: entry.treatment,
          date: entry.date?.toISOString(),
          notes: entry.notes
        })) || [];

      // Prepare the data according to the API specification
      const petData = {
        name: values.name,
        type: values.type,
        breed: values.breed,
        age: values.age,
        gender: values.gender,
        weight: values.weight,
        pictures: pictures,
        medicalHistory: medicalHistory,
        vaccinations: [],
        specialNeeds: []
      };

      const response = await fetch('http://localhost:5000/api/auth/pets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
      });

      if (response.ok) {
        message.success('Pet added successfully!');
        form.resetFields();
      } else {
        throw new Error('Failed to add pet');
      }
    } catch (error) {
      message.error('Failed to add pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="p-4">
      <Form form={form} layout="vertical" onFinish={onFinish} className="max-w-2xl mx-auto">
        <Form.Item name="name" label="Pet Name" rules={[{ required: true, message: "Please input your pet's name!" }]}>
          <Input size="large" />
        </Form.Item>

        <Form.Item name="type" label="Pet Type" rules={[{ required: true, message: 'Please select your pet type!' }]}>
          <Select size="large">
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="breed" label="Breed" rules={[{ required: true, message: "Please input your pet's breed!" }]}>
          <Input size="large" />
        </Form.Item>

        <Form.Item name="age" label="Age" rules={[{ required: true, message: "Please input your pet's age!" }]}>
          <Input size="large" placeholder="e.g. 2 years, 6 months" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select your pet's gender!" }]}>
          <Select size="large">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item name="weight" label="Weight (kg)" rules={[{ required: true, message: "Please input your pet's weight!" }]}>
          <Input type="number" size="large" />
        </Form.Item>

        <Form.List name="medicalHistory">
          {(fields, { add }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 mb-4 rounded">
                  <Form.Item
                    {...restField}
                    name={[name, 'condition']}
                    label="Condition"
                    rules={[{ required: true, message: 'Please input the condition!' }]}
                  >
                    <Input placeholder="Enter condition" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'diagnosis']}
                    label="Diagnosis"
                    rules={[{ required: true, message: 'Please input the diagnosis!' }]}
                  >
                    <Input placeholder="Enter diagnosis" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'treatment']}
                    label="Treatment"
                    rules={[{ required: true, message: 'Please input the treatment!' }]}
                  >
                    <Input placeholder="Enter treatment" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    label="Date"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'notes']} label="Notes">
                    <Input.TextArea placeholder="Enter additional notes" />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Medical History Entry
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="photo" label="Pet Photos" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload listType="picture" beforeUpload={() => false} multiple>
            <Button icon={<UploadOutlined />}>Upload Photos</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading} className="w-full">
            Add Pet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPet;
