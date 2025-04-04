import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PetOwnerDashboard from './pet-owner/PetOwnerDashboard';
import VeterinarianDashboard from './veterinarian/VeterinarianDashboard';
import BoarderDashboard from './boarder/BoarderDashboard';

const RoleBasedDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.userType) {
    case 'petOwner':
      return <PetOwnerDashboard />;
    case 'veterinarian':
      return <VeterinarianDashboard />;
    case 'boarder':
      return <BoarderDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

export default RoleBasedDashboard;
