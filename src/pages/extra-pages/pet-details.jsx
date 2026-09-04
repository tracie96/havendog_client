import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Space, Select, Radio, Checkbox, Collapse, Divider } from 'antd';
import { CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { formatPetAge } from '../../utils/formatPetAge';
import './pet-details.css';

const { Panel } = Collapse;

const PetDetails = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const interestType = Form.useWatch('interestType', form);
  const isFoster = interestType === 'foster';
  const { id } = useParams();
  const navigate = useNavigate();

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
      const payload = {
        petId: id,
        interestType: values.interestType,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        homeAddress: values.homeAddress,
        confirmInformationAccurate: values.confirmInformationAccurate,
        petApplyingFor: pet?.name
      };

      if (values.interestType === 'foster') {
        payload.fosterDuration = '2-weeks';
      } else {
        Object.assign(payload, values);
      }

      await axios.post(`${API_CONFIG.baseURL}/interests`, payload);
      message.success(
        values.interestType === 'foster'
          ? 'Foster interest submitted successfully! We will review your request and get back to you soon.'
          : 'Expression of Interest submitted successfully! We will review your application and get back to you soon.'
      );
      form.resetFields();
    } catch (error) {
      console.error('Error submitting interest:', error);
      message.error(error.response?.data?.message || 'Failed to submit interest');
    }
  };

  if (loading) {
    return (
      <>
        <HomeHeader />
        <div className="pet-details-page">
          <div className="pet-details-status">
            <p>Loading pet details…</p>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <HomeHeader />
        <div className="pet-details-page">
          <div className="pet-details-status">
            <h1>Pet not found</h1>
            <p>This pet may have been removed or the link is incorrect.</p>
            <Button type="primary" className="pet-adopted-cta" onClick={() => navigate('/up-for-adoption')}>
              View Available Pets
            </Button>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }

  const isAdopted = pet.status === 'adopted' || pet.isAdopted;

  return (
    <>
      <HomeHeader />
      <main className="pet-details-page">
        <div className="pet-details-wrap">
          <Button
            className="pet-details-back"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/up-for-adoption')}
          >
            Back to pets
          </Button>

          <div className="pet-details-grid">
            <article className="pet-profile">
              <div className="pet-profile-media">
                <img alt={pet.name} src={pet.imageUrl} />
                {isAdopted && (
                  <span className="pet-profile-badge">
                    <CheckCircleOutlined /> Adopted
                  </span>
                )}
              </div>
              <div className="pet-profile-body">
                <p className="pet-profile-kicker">{isAdopted ? 'Forever home found' : 'Looking for a home'}</p>
                <h1 className="pet-profile-name">{pet.name}</h1>
                <ul className="pet-profile-facts">
                  <li>
                    <strong>Breed</strong>
                    <span>{pet.breed || 'Mixed'}</span>
                  </li>
                  <li>
                    <strong>Age</strong>
                    <span>{formatPetAge(pet.age)}</span>
                  </li>
                  <li>
                    <strong>Location</strong>
                    <span>{pet.location || 'Lagos'}</span>
                  </li>
                </ul>
                {pet.description && <p className="pet-profile-desc">{pet.description}</p>}
              </div>
            </article>

            {isAdopted ? (
              <div className="pet-adopted-panel">
                <CheckCircleOutlined className="pet-adopted-icon" />
                <h2>This pet has been adopted</h2>
                <p>
                  {pet.name} has found a loving forever home. Browse our other pets still looking for
                  families.
                </p>
                <Button type="primary" className="pet-adopted-cta" onClick={() => navigate('/up-for-adoption')}>
                  View Available Pets
                </Button>
              </div>
            ) : (
              <div className="pet-form-panel">
                <h2 className="pet-form-title">Expression of Interest</h2>
                <p className="pet-form-lead">
                  Tell us whether you&apos;d like to adopt or foster {pet.name}. We review every
                  application carefully.
                </p>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  scrollToFirstError
                  initialValues={{ interestType: 'adoption' }}
                >
                  <Form.Item
                    name="interestType"
                    label="Are you interested in fostering or adoption?"
                    rules={[{ required: true, message: 'Please choose foster or adoption!' }]}
                    style={{ marginBottom: 24 }}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="adoption">Adoption — permanent forever home</Radio>
                        <Radio value="foster">Foster — temporary care for 2 weeks</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  {isFoster && (
                    <div className="pet-foster-note">
                      Foster is a short-term commitment of <strong>2 weeks</strong>. Please share your
                      basic contact details and address below — we will follow up with next steps.
                    </div>
                  )}

                  <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="1. Basic Information" key="1">
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

                      {!isFoster && (
                        <>
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
                        </>
                      )}
                    </Panel>

                    {!isFoster && (
                      <>
                        <Panel header="2. Living Situation" key="2">
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
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.ownershipType !== currentValues.ownershipType
                            }
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

                        <Panel header="3. Pet Experience" key="3">
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
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.ownedDogBefore !== currentValues.ownedDogBefore
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue('ownedDogBefore') === 'yes' ? (
                                <Form.Item
                                  name="previousPetOutcome"
                                  label="What happened to your previous pet?"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please explain what happened to your previous pet!'
                                    }
                                  ]}
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
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.currentlyHavePets !== currentValues.currentlyHavePets
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue('currentlyHavePets') === 'yes' ? (
                                <>
                                  <Form.Item
                                    name="currentPetsDetails"
                                    label="If yes: species, age, vaccination status"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please provide details about your current pets!'
                                      }
                                    ]}
                                  >
                                    <Input.TextArea
                                      rows={3}
                                      placeholder="e.g., 1 dog, 3 years old, fully vaccinated"
                                    />
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

                        <Panel header="4. Lifestyle & Commitment" key="4">
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
                            <Input.TextArea
                              rows={3}
                              placeholder="e.g., Pet sitter, family member, boarding facility"
                            />
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

                        <Panel header="5. Health & Responsibility" key="5">
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

                        <Panel header="6. Financial Readiness" key="6">
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

                        <Panel header="7. Dog-Specific Questions" key="7">
                          <Form.Item name="petApplyingFor" label="Pet you're applying for" initialValue={pet?.name}>
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

                        <Panel header="8. Agreement Section" key="8">
                          <Form.Item
                            name="confirmInformationAccurate"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('You must confirm the information is accurate!'))
                              }
                            ]}
                          >
                            <Checkbox>I confirm the information provided is accurate.</Checkbox>
                          </Form.Item>

                          <Form.Item
                            name="understandSelectiveProcess"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('You must acknowledge the selective process!'))
                              }
                            ]}
                          >
                            <Checkbox>I understand the adoption process is selective.</Checkbox>
                          </Form.Item>

                          <Form.Item
                            name="agreeToHomeCheck"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('You must agree to a home check!'))
                              }
                            ]}
                          >
                            <Checkbox>I agree to a home check (if applicable).</Checkbox>
                          </Form.Item>

                          <Form.Item
                            name="agreeToAdoptionContract"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('You must agree to sign an adoption contract!'))
                              }
                            ]}
                          >
                            <Checkbox>I agree to sign an adoption contract.</Checkbox>
                          </Form.Item>
                        </Panel>
                      </>
                    )}

                    {isFoster && (
                      <Panel header="2. Confirmation" key="foster-confirm">
                        <Form.Item
                          name="confirmInformationAccurate"
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value
                                  ? Promise.resolve()
                                  : Promise.reject(new Error('You must confirm the information is accurate!'))
                            }
                          ]}
                        >
                          <Checkbox>
                            I confirm the information provided is accurate and I am interested in fostering for
                            2 weeks.
                          </Checkbox>
                        </Form.Item>
                      </Panel>
                    )}
                  </Collapse>

                  <Divider />

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" className="pet-submit-btn">
                      {isFoster ? 'Submit Foster Interest' : 'Submit Expression of Interest'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </main>
      <HomeFooter />
    </>
  );
};

export default PetDetails;
