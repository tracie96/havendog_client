// assets
import {
  DashboardOutlined,
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
  CreditCardOutlined,
  BellOutlined,
  HeartOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  PlusOutlined
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
  CreditCardOutlined,
  BellOutlined,
  HeartOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  PlusOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'my-pets',
      title: 'My Pets',
      type: 'item',
      url: '/dashboard/pet-owner/my-pets',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-pet',
      title: 'Add New Pet',
      type: 'item',
      url: '/dashboard/pet-owner/add-pet',
      icon: icons.PlusOutlined,
      breadcrumbs: false
    },
    {
      id: 'veterinarians',
      title: 'Find Veterinarians',
      type: 'item',
      url: '/dashboard/pet-owner/veterinarians',
      icon: icons.MedicineBoxOutlined,
      breadcrumbs: false
    },
    {
      id: 'boarders',
      title: 'Find Pet Boarders',
      type: 'item',
      url: '/dashboard/pet-owner/boarders',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },
    {
      id: 'appointments',
      title: 'My Appointments',
      type: 'item',
      url: '/dashboard/pet-owner/appointments',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
    {
      id: 'adoptions',
      title: 'Adoptions',
      type: 'item',
      url: '/dashboard/pet-owner/adoptions',
      icon: icons.HeartOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
