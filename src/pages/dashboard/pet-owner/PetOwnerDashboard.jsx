import React, { useState } from 'react';
import { Tabs, Card, Row, Col } from 'antd';
import ViewVets from './ViewVets';
import AddPet from './AddPet';
import ViewBoarders from './ViewBoarders';
import MyPets from './MyPets';

const { TabPane } = Tabs;

const PetOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="p-6">
      <Card className="w-full">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="My Pets" key="1">
            <MyPets />
          </TabPane>
          <TabPane tab="Find Veterinarians" key="2">
            <ViewVets />
          </TabPane>
          <TabPane tab="Find Pet Boarders" key="3">
            <ViewBoarders />
          </TabPane>
          <TabPane tab="Add New Pet" key="4">
            <AddPet />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PetOwnerDashboard;
