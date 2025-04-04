import { Outlet } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';

// project import
import DashboardLayout from '../Dashboard';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </Box>
  );
}
