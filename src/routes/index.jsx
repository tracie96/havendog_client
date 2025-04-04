import { createBrowserRouter } from 'react-router-dom';
import AppRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

console.log('AppRoutes:', AppRoutes);
console.log('MainRoutes:', MainRoutes);

const router = createBrowserRouter([...AppRoutes, MainRoutes]);

export default router;
