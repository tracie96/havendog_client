import {
  UserOutlined,
  TeamOutlined,
  HeartOutlined,
  PlusOutlined,
  CalendarOutlined,
  MessageOutlined,
  CreditCardOutlined,
  BellOutlined
} from '@ant-design/icons';

const icons = {
  UserOutlined,
  TeamOutlined,
  HeartOutlined,
  PlusOutlined,
  CalendarOutlined,
  MessageOutlined,
  CreditCardOutlined,
  BellOutlined
};

const petOwnerMenu = {
  id: 'group-pet-owner',
  title: 'Pet Owner Menu',
  type: 'group',
  children: [
    {
      id: 'my-pets',
      title: 'My Pets',
      type: 'item',
      url: '/dashboard/pet-owner/pets',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-pet',
      title: 'Add Pet',
      type: 'item',
      url: '/dashboard/pet-owner/add-pet',
      icon: icons.PlusOutlined,
      breadcrumbs: false
    },
    {
      id: 'available-vets',
      title: 'Available Veterinarians',
      type: 'item',
      url: '/dashboard/pet-owner/vets',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'pet-boarders',
      title: 'Pet Boarders',
      type: 'item',
      url: '/dashboard/pet-owner/boarders',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      type: 'item',
      url: '/dashboard/pet-owner/bookings',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
    {
      id: 'messages',
      title: 'Messages',
      type: 'item',
      url: '/dashboard/pet-owner/messages',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      type: 'item',
      url: '/dashboard/pet-owner/payments',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      url: '/dashboard/pet-owner/notifications',
      icon: icons.BellOutlined,
      breadcrumbs: false
    }
  ]
};

export default petOwnerMenu;
