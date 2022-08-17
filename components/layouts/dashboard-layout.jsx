import Loading from '@components/loading/loading';
import { Box, CircularProgress } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { fetchHivenDetails, fetchHivenNews } from '@utils/hivenSlice';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
   const router = useRouter();
   const [isSidebarOpen, setSidebarOpen] = useState(true);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   // const lgUp = useMediaQuery('(min-width:1200px)', {
   //    defaultMatches: true,
   //    noSsr: false,
   // });

   useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
         router.push('/admin');
      }

      (async () => {
         await dispatch(fetchHivenDetails());
         await dispatch(fetchHivenNews());
         setLoading(false);
      })();
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <Head>
            <title>Hiven Admin</title>
         </Head>
         {loading ? (
            <Box
               sx={{
                  width: '100%',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <Loading />
            </Box>
         ) : (
            <>
               <DashboardLayoutRoot>
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
               </DashboardLayoutRoot>
               <DashboardNavbar onSidebarOpen={() => {setSidebarOpen(true)}} />
               <DashboardSidebar
                  onClose={() => setSidebarOpen(false)}
                  open={isSidebarOpen}
               />
            </>
         )}
      </ThemeProvider>
   );
};
