// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Welcome to Your Pet Dashboard!</Typography>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Your Pets" count="0" extra="Add your first pet" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Upcoming Appointments" count="0" extra="No appointments yet" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Active Boarding" count="0" extra="No active boarding" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Vet Visits" count="0" extra="No visits recorded" />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Getting Started</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Add Your First Pet" secondary="Start by adding your pet's information" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Find a Veterinarian" secondary="Search for vets in your area" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Schedule Checkup" secondary="Book your pet's first appointment" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Quick Tips</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Complete Your Profile" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Add Pet Information" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Set Up Reminders" />
              <Typography variant="h5">→</Typography>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>

      {/* row 5 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Welcome Guide</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Getting Started Guide</Typography>}
                secondary="Learn how to use your pet dashboard"
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle1" noWrap>
                  Start Here
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Find Local Services</Typography>}
                secondary="Discover vets and pet services near you"
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle1" noWrap>
                  Explore
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Set Up Preferences</Typography>}
                secondary="Customize your dashboard experience"
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle1" noWrap>
                  Configure
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>

      {/* row 6 */}
      <Grid item xs={12} md={5} lg={4}>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Quick Actions
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Start managing your pets
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Add Your First Pet
            </Button>
            <Button size="small" variant="outlined" sx={{ textTransform: 'capitalize' }}>
              Complete Profile
            </Button>
            <Button size="small" variant="outlined" sx={{ textTransform: 'capitalize' }}>
              View Getting Started Guide
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
