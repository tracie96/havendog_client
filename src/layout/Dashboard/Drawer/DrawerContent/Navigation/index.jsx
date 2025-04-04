import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import getMenuItems from './menuItems';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const userType = useSelector((state) => state.auth.user?.userType);
  console.log('User Type:', userType);
  const menuItems = getMenuItems(userType);

  return (
    <List sx={{ width: '100%', p: 0 }}>
      {menuItems.map((item) => (
        <ListItem
          key={item.key}
          button
          onClick={() => navigate(item.key)}
          selected={location.pathname === item.key}
          sx={{
            '&.Mui-selected': {
              bgcolor: theme.palette.primary.lighter,
              '&:hover': { bgcolor: theme.palette.primary.lighter }
            },
            '&:hover': { bgcolor: theme.palette.primary.lighter }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.key ? theme.palette.primary.main : 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontWeight: location.pathname === item.key ? 600 : 400,
                  color: location.pathname === item.key ? theme.palette.primary.main : 'inherit'
                }}
              >
                {item.label}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
