import styled from '@emotion/styled';
import {
   AppBar,
   Avatar,
   Box,
   Button,
   Divider,
   IconButton,
   ListItemIcon,
   Menu,
   MenuItem,
   Toolbar,
   Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserCircle as UserCircleIcon } from './ic-user-circle';
import IconMenu from './ic-menu';
import IconPerson from './ic-person';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
   backgroundColor: '#fff',
   boxShadow: '0px 1px 4px rgba(100, 116, 139, 0.12)',
}));

export const DashboardNavbar = (props) => {
   const router = useRouter();

   const { onSidebarOpen, ...other } = props;
   const [anchorEl, setAnchorEl] = useState(null);
   const openPopover = Boolean(anchorEl);

   const handleLogoutClick = async () => {
      await logout();
      setAnchorEl(null);
   };
   return (
      <DashboardNavbarRoot
         sx={{
            left: {
               lg: 280,
            },
            width: {
               lg: 'calc(100% - 280px)',
            },
            zIndex: 1200,
         }}
         {...other}
      >
         <Toolbar
            disableGutters
            sx={{
               minHeight: 64,
               left: 0,
               px: 2,
            }}
         >
            <IconButton
               onClick={onSidebarOpen}
               sx={{
                  display: {
                     xs: 'inline-flex',
                     lg: 'none',
                     color: '#1d223a',
                  },
               }}
            >
               <IconMenu fill="#1d223a" />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Tooltip title="Contacts">
               <IconButton sx={{ ml: 1 }}>
                  <UsersIcon fontSize="small" />
               </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
               <IconButton sx={{ ml: 1 }}>
                  <Badge badgeContent={4} color="primary" variant="dot">
                     <BellIcon fontSize="small" />
                  </Badge>
               </IconButton>
            </Tooltip> */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
               <Avatar
                  sx={{
                     height: 40,
                     width: 40,
                     ml: 1,
                  }}
                  src="https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg"
               >
                  <UserCircleIcon fontSize="small" />
               </Avatar>
            </IconButton>
         </Toolbar>

         <Menu
            open={openPopover}
            anchorEl={anchorEl}
            onClose={() => {
               setAnchorEl(null);
            }}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            PaperProps={{
               sx: { maxWidth: '100%', width: 300, border: '1px solid #E6E8F0' },
            }}
         >
            <Box sx={{ p: 1, display: 'flex', gap: 2 }}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                     sx={{
                        height: 40,
                        width: 40,
                        ml: 1,
                     }}
                     src="https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg"
                  >
                     <UserCircleIcon fontSize="small" />
                  </Avatar>
               </Box>
               <Box
                  sx={{
                     flex: 1,
                     display: 'flex',
                     alignItems: 'start',
                     justifyContent: 'center',
                     flexDirection: 'column',
                  }}
               >
                  <Typography variant="subtitle1">{'profile.name'}</Typography>
                  <Typography
                     variant="subtitle2"
                     color="text.secondary"
                     sx={{ fontWeight: 400 }}
                  >
                     {'profile.email'}
                  </Typography>
               </Box>
            </Box>
            <Divider />
            <MenuItem
               sx={{ mt: 1, p: 2 }}
               onClick={() => {
                  router.push('/account');
                  setAnchorEl(null);
               }}
            >
               <ListItemIcon>
                  <IconPerson />
               </ListItemIcon>
               Account
            </MenuItem>
            <Box sx={{ mt: 1, px: 2 }}>
               <Button variant="outlined" fullWidth onClick={handleLogoutClick}>
                  Logout
               </Button>
            </Box>
         </Menu>
      </DashboardNavbarRoot>
   );
};

DashboardNavbar.propTypes = {
   onSidebarOpen: PropTypes.func,
};
