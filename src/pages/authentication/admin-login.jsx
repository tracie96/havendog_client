import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AdminLogin from './auth-forms/AdminLogin';

// ================================|| ADMIN LOGIN ||================================ //

export default function AdminLoginPage() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Admin Login</Typography>
            <Typography component={Link} to="/admin/register" variant="body1" sx={{ textDecoration: 'none', color: '#FF0080' }}>
              Create Admin Account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AdminLogin />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Typography component={Link} to="/login" variant="body2" sx={{ textDecoration: 'none', color: '#666' }}>
              Regular User Login
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

