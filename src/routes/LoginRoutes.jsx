import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import HomePage from 'pages/extra-pages/home-page';
import BlogSection from 'pages/extra-pages/blog';
import DonatePage from 'pages/extra-pages/donate';
import CreateAdoption from 'pages/extra-pages/create-adoption';
import UpForAdoption from 'pages/extra-pages/up-for-adoption';
import PetDetails from 'pages/extra-pages/pet-details';
import AdoptionRequests from 'pages/extra-pages/adoption-requests';

// Lazy load pages
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));
const AboutUs = Loadable(lazy(() => import('pages/extra-pages/about-us')));

const AppRoutes = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <AuthLogin />
      },
      {
        path: 'register',
        element: <AuthRegister />
      }
    ]
  },
  {
    path: 'about-us',
    element: <AboutUs />
  },
  {
    path: 'blog',
    element: <BlogSection />
  },
  {
    path: 'up-for-adoption',
    element: <UpForAdoption />
  },
  {
    path: 'pet-details/:id',
    element: <PetDetails />
  },
  {
    path: 'create-adoption',
    element: <CreateAdoption />
  },
  {
    path: 'donate',
    element: <DonatePage />
  },
  {
    path: 'adoption-requests',
    element: <AdoptionRequests />
  }
];

export default AppRoutes;
