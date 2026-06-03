import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// Pet Owner Components
const MyPets = Loadable(lazy(() => import('pages/dashboard/pet-owner/MyPets')));
const AddPet = Loadable(lazy(() => import('pages/dashboard/pet-owner/AddPet')));
const AvailableVets = Loadable(lazy(() => import('pages/dashboard/pet-owner/AvailableVets')));
const PetBoarders = Loadable(lazy(() => import('pages/dashboard/pet-owner/PetBoarders')));
const MyBookings = Loadable(lazy(() => import('pages/dashboard/pet-owner/MyBookings')));
// const Payments = Loadable(lazy(() => import('pages/dashboard/pet-owner/Payments')));
// const Notifications = Loadable(lazy(() => import('pages/dashboard/pet-owner/Notifications')));

// Admin Components
const CreateAdoption = Loadable(lazy(() => import('pages/dashboard/admin/CreateAdoption')));
const UpdateAdoption = Loadable(lazy(() => import('pages/dashboard/admin/UpdateAdoption')));
const AdoptionRequests = Loadable(lazy(() => import('pages/dashboard/admin/AdoptionRequests')));
const CreateBoarding = Loadable(lazy(() => import('pages/dashboard/admin/CreateBoarding')));
const Boarders = Loadable(lazy(() => import('pages/dashboard/admin/Boarders')));
const AdoptedDogs = Loadable(lazy(() => import('pages/dashboard/admin/AdoptedDogs')));


// render - sample page

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <Dashboard />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    // Pet Owner Routes
    {
      path: 'pet-owner',
      children: [
        {
          path: 'pets',
          element: <MyPets />
        },
        {
          path: 'add-pet',
          element: <AddPet />
        },
        {
          path: 'vets',
          element: <AvailableVets />
        },
        {
          path: 'boarders',
          element: <PetBoarders />
        },
        {
          path: 'bookings',
          element: <MyBookings />
        }
        // {
        //   path: 'messages',
        //   element: <Messages />
        // },
        // {
        //   path: 'payments',
        //   element: <Payments />
        // },
        // {
        //   path: 'notifications',
        //   element: <Notifications />
        // }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    // Admin Routes
    {
      path: 'admin',
      children: [
        {
          path: 'create-adoption',
          element: <CreateAdoption />
        },
        {
          path: 'update-adoption',
          element: <UpdateAdoption />
        },
        {
          path: 'adoption-requests',
          element: <AdoptionRequests />
        },
        {
          path: 'create-boarding',
          element: <CreateBoarding />
        },
        {
          path: 'boarders',
          element: <Boarders />
        },
        {
          path: 'adopted-dogs',
          element: <AdoptedDogs />
        }
      ]
    }
  ]
};

export default MainRoutes;
