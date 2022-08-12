import { Box, CircularProgress } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { fetchHivenDetails, fetchHivenNews } from '@utils/hivenSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { theme } from './dashboard-theme';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
   display: 'flex',
   flex: '1 1 auto',
   maxWidth: '100%',
   paddingTop: 64,
   paddingLeft: 99,
   '@media (min-width:1200px)': { paddingLeft: 280 },
}));

export const DashboardLayout = ({ children }) => {
   const [isSidebarOpen, setSidebarOpen] = useState(true);
   const dispatch = useDispatch();
   const hiven = useSelector((x) => x.hiven.data);

   useEffect(() => {
      (async () => {
         await dispatch(fetchHivenDetails());
         await dispatch(fetchHivenNews());
      })();
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <DashboardLayoutRoot>
            {!hiven?.id ? (
               <Box
                  sx={{
                     width: '100%',
                     height: 300,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
               >
                  <CircularProgress />
               </Box>
            ) : (
               <Box
                  sx={{
                     display: 'flex',
                     flex: '1 1 auto',
                     flexDirection: 'column',
                     width: '100%',
                     scrollBehavior: 'smooth',
                  }}
               >
                  {children}
               </Box>
            )}
         </DashboardLayoutRoot>
         <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
         <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </ThemeProvider>
   );
};
