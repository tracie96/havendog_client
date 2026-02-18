import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Form, Input, message, Space, Select, Radio, Checkbox, Collapse, Divider } from 'antd';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';

const { Panel } = Collapse;

const { Text } = Typography;

const PetDetails = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const formatAge = (months) => {
    if (!months && months !== 0) return 'Age unknown';
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/adoptions/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet:', error);
        message.error('Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/interests`, {
        petId: id,
        ...values
      });
      message.success('Expression of Interest submitted successfully! We will review your application and get back to you soon.');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting interest:', error);
      message.error('Failed to submit interest');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <>
      <HomeHeader />
      <div className="container p-4">
        <Button onClick={() => navigate(-1)} className="mb-4">
          Back to List
        </Button>
        
        <div className="row">
          <div className="col-md-6">
            <Card
              cover={<img alt={pet.name} src={pet.imageUrl} style={{ height: 400, objectFit: 'cover' }} />}
            >
              <Card.Meta
                title={pet.name}
                description={
                  <Space direction="vertical" size="small">
                    <Text>
                      <strong>Breed:</strong> {pet.breed}
                    </Text>
                    <Text>
                      <strong>Age:</strong> {formatAge(pet.age)}
                    </Text>
                    <Text>
                      <strong>Location:</strong> {pet.location}
                    </Text>
                    <Text>
                      <strong>Description:</strong> {pet.description}
                    </Text>
                    {/* <Text type="secondary">
                      Posted by: {pet.postedBy?.firstName} {pet.postedBy?.lastName}
                    </Text> */}
                  </Space>
                }
              />
            </Card>
          </div>
          
          <div className="col-md-6">
            <Card title="🐾 Expression of Interest - Adoption Application">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                scrollToFirstError
              >
                <Collapse defaultActiveKey={['1']} ghost>
                  {/* Section 1: Basic Information */}
                  <Panel header="1️⃣ Basic Information" key="1">
                    <Form.Item
                      name="fullName"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                      <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item
                      name="phoneNumber"
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    <Form.Item
                      name="emailAddress"
                      label="Email Address"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input placeholder="Enter your email address" />
                    </Form.Item>

                    <Form.Item
                      name="homeAddress"
                      label="Home Address (area is fine if you prefer privacy)"
                      rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                      <Input.TextArea rows={2} placeholder="Enter your address or area" />
                    </Form.Item>

                    <Form.Item
                      name="occupation"
                      label="Occupation"
                      rules={[{ required: true, message: 'Please input your occupation!' }]}
                    >
                      <Input placeholder="Enter your occupation" />
                    </Form.Item>

                    <Form.Item
                      name="workSchedule"
                      label="Work Schedule"
                      rules={[{ required: true, message: 'Please select your work schedule!' }]}
                    >
                      <Select placeholder="Select your work schedule">
                        <Select.Option value="9-5">9-5</Select.Option>
                        <Select.Option value="remote">Remote</Select.Option>
                        <Select.Option value="shift-work">Shift Work</Select.Option>
                        <Select.Option value="flexible">Flexible</Select.Option>
                        <Select.Option value="unemployed">Unemployed</Select.Option>
                        <Select.Option value="retired">Retired</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Panel>

                  {/* Section 2: Living Situation */}
                  <Panel header="2️⃣ Living Situation" key="2">
                    <Form.Item
                      name="accommodationType"
                      label="Do you live in a:"
                      rules={[{ required: true, message: 'Please select your accommodation type!' }]}
                    >
                      <Radio.Group>
                        <Radio value="apartment">Apartment</Radio>
                        <Radio value="detached-house">Detached House</Radio>
                        <Radio value="shared-accommodation">Shared Accommodation</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="ownershipType"
                      label="Do you own or rent?"
                      rules={[{ required: true, message: 'Please select ownership type!' }]}
                    >
                      <Radio.Group>
                        <Radio value="own">Own</Radio>
                        <Radio value="rent">Rent</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.ownershipType !== currentValues.ownershipType}
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('ownershipType') === 'rent' ? (
                          <Form.Item
                            name="petOwnershipAllowed"
                            label="Is pet ownership allowed?"
                            rules={[{ required: true, message: 'Please confirm if pets are allowed!' }]}
                          >
                            <Radio.Group>
                              <Radio value="yes">Yes</Radio>
                              <Radio value="no">No</Radio>
                            </Radio.Group>
                          </Form.Item>
                        ) : null
                      }
                    </Form.Item>

                    <Form.Item
                      name="fencedYard"
                      label="Do you have a fenced yard?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="householdMembers"
                      label="Who lives with you? (Adults, children — ages)"
                      rules={[{ required: true, message: 'Please describe your household!' }]}
                    >
                      <Input.TextArea rows={3} placeholder="e.g., 2 adults, 1 child (age 8)" />
                    </Form.Item>
                  </Panel>

                  {/* Section 3: Pet Experience */}
                  <Panel header="3️⃣ Pet Experience" key="3">
                    <Form.Item
                      name="ownedDogBefore"
                      label="Have you owned a dog before?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.ownedDogBefore !== currentValues.ownedDogBefore}
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('ownedDogBefore') === 'yes' ? (
                          <Form.Item
                            name="previousPetOutcome"
                            label="What happened to your previous pet?"
                            rules={[{ required: true, message: 'Please explain what happened to your previous pet!' }]}
                          >
                            <Input.TextArea rows={3} placeholder="Please provide details" />
                          </Form.Item>
                        ) : null
                      }
                    </Form.Item>

                    <Form.Item
                      name="currentlyHavePets"
                      label="Do you currently have pets?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.currentlyHavePets !== currentValues.currentlyHavePets}
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('currentlyHavePets') === 'yes' ? (
                          <>
                            <Form.Item
                              name="currentPetsDetails"
                              label="If yes: species, age, vaccination status"
                              rules={[{ required: true, message: 'Please provide details about your current pets!' }]}
                            >
                              <Input.TextArea rows={3} placeholder="e.g., 1 dog, 3 years old, fully vaccinated" />
                            </Form.Item>
                            <Form.Item
                              name="currentPetsSterilized"
                              label="Are your pets sterilized?"
                              rules={[{ required: true, message: 'Please answer this question!' }]}
                            >
                              <Radio.Group>
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                                <Radio value="some">Some</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </>
                        ) : null
                      }
                    </Form.Item>
                  </Panel>

                  {/* Section 4: Lifestyle & Commitment */}
                  <Panel header="4️⃣ Lifestyle & Commitment" key="4">
                    <Form.Item
                      name="adoptionReason"
                      label="Why do you want to adopt this dog?"
                      rules={[{ required: true, message: 'Please explain why you want to adopt!' }]}
                    >
                      <Input.TextArea rows={4} placeholder="Please share your reasons for adoption" />
                    </Form.Item>

                    <Form.Item
                      name="primaryCaregiver"
                      label="Who will be primarily responsible for daily care?"
                      rules={[{ required: true, message: 'Please specify the primary caregiver!' }]}
                    >
                      <Input placeholder="e.g., Myself, My spouse, etc." />
                    </Form.Item>

                    <Form.Item
                      name="hoursAloneDaily"
                      label="How many hours will the dog be alone daily?"
                      rules={[{ required: true, message: 'Please specify hours alone!' }]}
                    >
                      <Input type="number" min={0} max={24} placeholder="Enter number of hours" />
                    </Form.Item>

                    <Form.Item
                      name="sleepingLocation"
                      label="Where will the dog sleep?"
                      rules={[{ required: true, message: 'Please specify where the dog will sleep!' }]}
                    >
                      <Select placeholder="Select sleeping location">
                        <Select.Option value="inside-house">Inside the house</Select.Option>
                        <Select.Option value="bedroom">In my bedroom</Select.Option>
                        <Select.Option value="living-room">Living room</Select.Option>
                        <Select.Option value="crate-inside">In a crate inside</Select.Option>
                        <Select.Option value="other">Other (please specify)</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="travelManagement"
                      label="How will you manage travel or emergencies?"
                      rules={[{ required: true, message: 'Please explain your plan!' }]}
                    >
                      <Input.TextArea rows={3} placeholder="e.g., Pet sitter, family member, boarding facility" />
                    </Form.Item>

                    <Form.Item
                      name="lifetimeCommitment"
                      label="Are you willing to commit for the dog's lifetime (10–15 years)?"
                      rules={[{ required: true, message: 'Please confirm your commitment!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes, absolutely</Radio>
                        <Radio value="unsure">Unsure</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Panel>

                  {/* Section 5: Health & Responsibility */}
                  <Panel header="5️⃣ Health & Responsibility" key="5">
                    <Form.Item
                      name="willingToVaccinate"
                      label="Are you willing to vaccinate regularly?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="willingToProvideVetCare"
                      label="Are you willing to provide routine vet care?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="willingToUseFleaPrevention"
                      label="Are you willing to use flea/tick prevention?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="willingToSterilize"
                      label="Are you willing to sterilize (if not already done)?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="preferredVeterinarian"
                      label="Preferred veterinarian (optional but excellent filter)"
                    >
                      <Input placeholder="Name and location of your preferred vet clinic" />
                    </Form.Item>
                  </Panel>

                  {/* Section 6: Financial Readiness */}
                  <Panel header="6️⃣ Financial Readiness" key="6">
                    <Form.Item
                      name="financiallyPrepared"
                      label="Are you financially prepared for:"
                      rules={[{ required: true, message: 'Please confirm your financial readiness!' }]}
                    >
                      <Checkbox.Group>
                        <Space direction="vertical">
                          <Checkbox value="food">Food</Checkbox>
                          <Checkbox value="grooming">Grooming</Checkbox>
                          <Checkbox value="emergency-vet-bills">Emergency vet bills</Checkbox>
                          <Checkbox value="training">Training if needed</Checkbox>
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Panel>

                  {/* Section 7: Dog-Specific Questions */}
                  <Panel header="7️⃣ Dog-Specific Questions" key="7">
                    <Form.Item
                      name="petApplyingFor"
                      label="Pet you're applying for"
                      initialValue={pet?.name}
                    >
                      <Input disabled />
                    </Form.Item>

                    <Form.Item
                      name="openToFosterToAdopt"
                      label="Are you open to foster-to-adopt trial?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                        <Radio value="maybe">Maybe</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="agreeNotToRehome"
                      label="Do you agree not to rehome or resell the dog?"
                      rules={[{ required: true, message: 'Please confirm your agreement!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes, I agree</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="willReturnToShelter"
                      label="If unable to keep the dog, will you return to the shelter?"
                      rules={[{ required: true, message: 'Please answer this question!' }]}
                    >
                      <Radio.Group>
                        <Radio value="yes">Yes, absolutely</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Panel>

                  {/* Section 8: Agreement Section */}
                  <Panel header="8️⃣ Agreement Section" key="8">
                    <Form.Item
                      name="confirmInformationAccurate"
                      valuePropName="checked"
                      rules={[
                        { 
                          validator: (_, value) => 
                            value ? Promise.resolve() : Promise.reject(new Error('You must confirm the information is accurate!'))
                        }
                      ]}
                    >
                      <Checkbox>
                        I confirm the information provided is accurate.
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="understandSelectiveProcess"
                      valuePropName="checked"
                      rules={[
                        { 
                          validator: (_, value) => 
                            value ? Promise.resolve() : Promise.reject(new Error('You must acknowledge the selective process!'))
                        }
                      ]}
                    >
                      <Checkbox>
                        I understand the adoption process is selective.
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="agreeToHomeCheck"
                      valuePropName="checked"
                      rules={[
                        { 
                          validator: (_, value) => 
                            value ? Promise.resolve() : Promise.reject(new Error('You must agree to a home check!'))
                        }
                      ]}
                    >
                      <Checkbox>
                        I agree to a home check (if applicable).
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="agreeToAdoptionContract"
                      valuePropName="checked"
                      rules={[
                        { 
                          validator: (_, value) => 
                            value ? Promise.resolve() : Promise.reject(new Error('You must agree to sign an adoption contract!'))
                        }
                      ]}
                    >
                      <Checkbox>
                        I agree to sign an adoption contract.
                      </Checkbox>
                    </Form.Item>
                  </Panel>
                </Collapse>

                <Divider />

                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large">
                    🐾 Submit Expression of Interest
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default PetDetails; 