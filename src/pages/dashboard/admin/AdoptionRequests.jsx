import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, Modal, message, Typography, Space, Descriptions, Collapse, Divider } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const { Title, Text } = Typography;
const { Panel } = Collapse;

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
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.interests}`, {
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
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.updateInterestStatus(requestId)}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      message.success(`Request ${newStatus} successfully. Email notification sent to requester.`);
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
      key: 'requester',
      render: (_, record) => record.fullName || record.interestedUser?.name || 'N/A',
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => record.emailAddress || record.interestedUser?.email || 'N/A',
    },
    {
      title: 'Phone',
      key: 'phone',
      render: (_, record) => record.phoneNumber || record.interestedUser?.phone || 'N/A',
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
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Pet Interest Requests</Title>
        <Table
          columns={columns}
          dataSource={requests}
          loading={loading}
          rowKey="_id"
        />
      </Card>

      <Modal
        title="Adoption Application Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {selectedRequest && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Descriptions title="Pet Information" bordered size="small" column={2}>
              <Descriptions.Item label="Name">{selectedRequest.petId?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Breed">{selectedRequest.petId?.breed || 'N/A'}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="1️⃣ Basic Information" key="1">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Full Name">
                    {selectedRequest.fullName || selectedRequest.interestedUser?.name || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {selectedRequest.phoneNumber || selectedRequest.interestedUser?.phone || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email Address">
                    {selectedRequest.emailAddress || selectedRequest.interestedUser?.email || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Home Address">
                    {selectedRequest.homeAddress || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Occupation">
                    {selectedRequest.occupation || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Work Schedule">
                    {selectedRequest.workSchedule || 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="2️⃣ Living Situation" key="2">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Accommodation Type">
                    {selectedRequest.accommodationType || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ownership Type">
                    {selectedRequest.ownershipType || 'N/A'}
                  </Descriptions.Item>
                  {selectedRequest.ownershipType === 'rent' && (
                    <Descriptions.Item label="Pet Ownership Allowed">
                      {selectedRequest.petOwnershipAllowed || 'N/A'}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label="Fenced Yard">
                    {selectedRequest.fencedYard || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Household Members">
                    {selectedRequest.householdMembers || 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="3️⃣ Pet Experience" key="3">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Owned Dog Before">
                    {selectedRequest.ownedDogBefore || 'N/A'}
                  </Descriptions.Item>
                  {selectedRequest.ownedDogBefore === 'yes' && (
                    <Descriptions.Item label="Previous Pet Outcome">
                      {selectedRequest.previousPetOutcome || 'N/A'}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label="Currently Have Pets">
                    {selectedRequest.currentlyHavePets || 'N/A'}
                  </Descriptions.Item>
                  {selectedRequest.currentlyHavePets === 'yes' && (
                    <>
                      <Descriptions.Item label="Current Pets Details">
                        {selectedRequest.currentPetsDetails || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Current Pets Sterilized">
                        {selectedRequest.currentPetsSterilized || 'N/A'}
                      </Descriptions.Item>
                    </>
                  )}
                </Descriptions>
              </Panel>

              <Panel header="4️⃣ Lifestyle & Commitment" key="4">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Adoption Reason">
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedRequest.adoptionReason || selectedRequest.message || 'N/A'}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Primary Caregiver">
                    {selectedRequest.primaryCaregiver || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Hours Alone Daily">
                    {selectedRequest.hoursAloneDaily !== undefined ? `${selectedRequest.hoursAloneDaily} hours` : 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sleeping Location">
                    {selectedRequest.sleepingLocation || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Travel Management">
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedRequest.travelManagement || 'N/A'}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Lifetime Commitment">
                    {selectedRequest.lifetimeCommitment || 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="5️⃣ Health & Responsibility" key="5">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Willing to Vaccinate">
                    {selectedRequest.willingToVaccinate || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Willing to Provide Vet Care">
                    {selectedRequest.willingToProvideVetCare || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Willing to Use Flea Prevention">
                    {selectedRequest.willingToUseFleaPrevention || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Willing to Sterilize">
                    {selectedRequest.willingToSterilize || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Preferred Veterinarian">
                    {selectedRequest.preferredVeterinarian || 'Not specified'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="6️⃣ Financial Readiness" key="6">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Financially Prepared For">
                    {selectedRequest.financiallyPrepared && selectedRequest.financiallyPrepared.length > 0
                      ? selectedRequest.financiallyPrepared.join(', ')
                      : 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="7️⃣ Dog-Specific Questions" key="7">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Pet Applying For">
                    {selectedRequest.petApplyingFor || selectedRequest.petId?.name || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Open to Foster-to-Adopt">
                    {selectedRequest.openToFosterToAdopt || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Agree Not to Rehome">
                    {selectedRequest.agreeNotToRehome || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Will Return to Shelter">
                    {selectedRequest.willReturnToShelter || 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="8️⃣ Agreement Section" key="8">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Confirm Information Accurate">
                    {selectedRequest.confirmInformationAccurate ? '✓ Yes' : '✗ No'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Understand Selective Process">
                    {selectedRequest.understandSelectiveProcess ? '✓ Yes' : '✗ No'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Agree to Home Check">
                    {selectedRequest.agreeToHomeCheck ? '✓ Yes' : '✗ No'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Agree to Adoption Contract">
                    {selectedRequest.agreeToAdoptionContract ? '✓ Yes' : '✗ No'}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            </Collapse>

            <Divider />

            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Date Submitted">
                {new Date(selectedRequest.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={selectedRequest.status === 'pending' ? 'orange' : selectedRequest.status === 'approved' ? 'green' : 'red'}>
                  {selectedRequest.status?.toUpperCase() || 'PENDING'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdoptionRequests;

