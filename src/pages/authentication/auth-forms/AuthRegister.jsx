import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Card, message, Steps, Row, Col } from 'antd';
import { registerUser, clearError } from 'store/slices/authSlice';
import './AuthRegister.css';

const { Option } = Select;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const onFinish = async (values) => {
    try {
      // Combine all form values
      const finalValues = {
        ...formValues,
        ...values
      };

      console.log('Final Form Values:', finalValues);

      // Validate all required fields are present
      const requiredFields = ['firstName', 'lastName', 'email', 'password', 'userType', 'phoneNumber', 'address'];
      const missingFields = requiredFields.filter((field) => !finalValues[field]);

      if (missingFields.length > 0) {
        console.log('Missing Fields:', missingFields);
        message.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Extract all fields including user type specific information
      const registrationData = {
        firstName: finalValues.firstName,
        lastName: finalValues.lastName,
        email: finalValues.email,
        password: finalValues.password,
        userType: finalValues.userType,
        phoneNumber: finalValues.phoneNumber,
        address: finalValues.address,
        ...(finalValues.petOwnerInfo && { petOwnerInfo: finalValues.petOwnerInfo }),
        ...(finalValues.veterinarianInfo && { veterinarianInfo: finalValues.veterinarianInfo })
      };

      console.log('Registration Data:', registrationData);

      // Send the registration data
      await dispatch(registerUser(registrationData)).unwrap();
      message.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration Error:', err);
      message.error(err.message || 'Registration failed');
    }
  };

  // Function to handle next step
  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        // Validate and collect basic info fields
        const basicInfo = await form.validateFields(['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address']);
        setFormValues((prev) => ({ ...prev, ...basicInfo }));
      } else if (currentStep === 1) {
        // Validate and collect user type
        const userType = await form.validateFields(['userType']);
        setFormValues((prev) => ({ ...prev, ...userType }));
      }

      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      const errorFields = errorInfo.errorFields || [];
      if (errorFields.length > 0) {
        message.error('Please fill in all required fields for this step');
      }
    }
  };

  // Function to handle previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input.TextArea size="large" rows={3} />
            </Form.Item>
          </Col>
        </Row>
      )
    },
    {
      title: 'User Type',
      content: (
        <Row justify="center">
          <Col xs={24} sm={16}>
            <Form.Item name="userType" label="User Type" rules={[{ required: true, message: 'Please select your user type!' }]}>
              <Select size="large">
                <Option value="petOwner">Pet Owner</Option>
                <Option value="veterinarian" disabled={true}>Veterinarian - Coming Soon</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )
    },
    {
      title: 'Additional Info',
      content: (
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.userType !== currentValues.userType}>
          {({ getFieldValue }) =>
            getFieldValue('userType') === 'petOwner' ? (
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={['petOwnerInfo', 'preferredContactMethod']}
                    label="Preferred Contact Method"
                    rules={[{ required: true, message: 'Please select your preferred contact method!' }]}
                  >
                    <Select size="large">
                      <Option value="phone">Phone Call</Option>
                      <Option value="text">Text Message</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.petOwnerInfo?.preferredContactMethod !== currentValues.petOwnerInfo?.preferredContactMethod
                    }
                  >
                    {({ getFieldValue }) => {
                      const contactMethod = getFieldValue(['petOwnerInfo', 'preferredContactMethod']);
                      return (
                        <Form.Item
                          name={['petOwnerInfo', 'contactInfo']}
                          label="Contact Information"
                          rules={[
                            {
                              required: true,
                              message: `Please input your ${contactMethod || 'contact'} information!`,
                              type: contactMethod === 'email' ? 'email' : undefined,
                              pattern: contactMethod === 'phone' || contactMethod === 'text' ? /^\+?[1-9]\d{1,14}$/ : undefined
                            }
                          ]}
                        >
                          {contactMethod === 'phone' || contactMethod === 'text' ? (
                            <Input size="large" placeholder="Enter your phone number" />
                          ) : (
                            <Input size="large" placeholder="Select contact method first" disabled />
                          )}
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name={['petOwnerInfo', 'emergencyContact']}
                    label="Emergency Contact"
                    rules={[{ required: true, message: 'Please input emergency contact information!' }]}
                  >
                    <Input.TextArea size="large" placeholder="Name and contact information of emergency contact" rows={2} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={['petOwnerInfo', 'veterinarian']} label="Current Veterinarian Service Provider">
                    <Input size="large" placeholder="Current veterinarian (if any)" />
                  </Form.Item>
                </Col>
              </Row>
            ) : getFieldValue('userType') === 'veterinarian' ? (
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name={['veterinarianInfo', 'clinic']}
                    label="Clinic Name"
                    rules={[{ required: true, message: 'Please input your clinic name!' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={['veterinarianInfo', 'specialization']}
                    label="Specialization"
                    rules={[{ required: true, message: 'Please input your specialization!' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={['veterinarianInfo', 'experience']}
                    label="Years of Experience"
                    rules={[{ required: true, message: 'Please input your years of experience!' }]}
                  >
                    <Input type="number" size="large" />
                  </Form.Item>
                </Col>
              </Row>
            ) : null
          }
        </Form.Item>
      )
    }
  ];

  return (
    <Card className="w-full border-none">
      <div className="steps-container mb-4">
        <Steps current={currentStep} items={steps.map((item) => ({ title: item.title }))} rootClassName="custom-steps" />
      </div>

      <div className="step-content">
        <Form form={form} layout="vertical" onFinish={onFinish} onValuesChange={() => dispatch(clearError())} initialValues={formValues}>
          {steps[currentStep].content}

          <div className="button-container">
            {currentStep > 0 ? (
              <Button onClick={handlePrevious} size="large">
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={handleNext} size="large" style={{ backgroundColor: '#FF0080', borderColor: '#FF0080' }}>
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                style={{ backgroundColor: '#FF0080', borderColor: '#FF0080' }}
              >
                Register
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default Register;
