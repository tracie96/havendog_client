import React from 'react';
import {
  FaHome,
  FaPaw,
  FaUserMd,
  FaHeart,
  FaCalendarAlt,
  FaFileAlt,
  FaUsers,
  FaUserFriends,
  FaClipboardList,
  FaPlus
} from 'react-icons/fa';

const getMenuItems = (userType) => {
  console.log('User Type in menuItems:', userType);

  const commonItems = [
    {
      key: '/dashboard',
      label: 'Dashboard',
      icon: React.createElement(FaHome, { size: 20 })
    },
    {
      key: '/dashboard/profile',
      label: 'Profile',
      icon: React.createElement(FaUserFriends, { size: 20 })
    }
  ];

  const petOwnerItems = [
    {
      key: '/dashboard/pet-owner/pets',
      label: 'My Pets',
      icon: React.createElement(FaPaw, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/add-pet',
      label: 'Add New Pet',
      icon: React.createElement(FaPlus, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/vets',
      label: 'Find Veterinarians',
      icon: React.createElement(FaUserMd, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/boarders',
      label: 'Find Pet Boarders',
      icon: React.createElement(FaUsers, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/adoption',
      label: 'Up for Adoption',
      icon: React.createElement(FaHeart, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/bookings',
      label: 'My Appointments',
      icon: React.createElement(FaCalendarAlt, { size: 20 })
    }
  ];

  const veterinarianItems = [
    {
      key: '/dashboard/veterinarian/appointments',
      label: 'Appointments',
      icon: React.createElement(FaCalendarAlt, { size: 20 })
    },
    {
      key: '/dashboard/veterinarian/patients',
      label: 'Patients',
      icon: React.createElement(FaPaw, { size: 20 })
    },
    {
      key: '/dashboard/veterinarian/medical-records',
      label: 'Medical Records',
      icon: React.createElement(FaFileAlt, { size: 20 })
    }
  ];

  const boarderItems = [
    {
      key: '/dashboard/pet-owner/boarding-requests',
      label: 'Boarding Requests',
      icon: React.createElement(FaClipboardList, { size: 20 })
    },
    {
      key: '/dashboard/pet-owner/boarded-pets',
      label: 'Boarded Pets',
      icon: React.createElement(FaPaw, { size: 20 })
    }
  ];

  let items = [...commonItems];

  switch (userType) {
    case 'petOwner':
      items = [...items, ...petOwnerItems];
      break;
    case 'veterinarian':
      items = [...items, ...veterinarianItems];
      break;
    case 'boarder':
      items = [...items, ...boarderItems];
      break;
    default:
      break;
  }

  console.log('Generated Menu Items:', items);
  return items;
};

export default getMenuItems;
