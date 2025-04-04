import { useSelector } from 'react-redux';
import dashboard from './dashboard';
import petOwnerMenu from './petOwnerMenu';
import pages from './page';

// ==============================|| MENU ITEMS ||============================== //

const MenuItems = () => {
  const { user } = useSelector((state) => state.auth);

  // Return different menu items based on user role
  if (user?.userType === 'petOwner') {
    return [petOwnerMenu];
  }

  // Default menu for other users
  return [dashboard, pages];
};

export default MenuItems;
