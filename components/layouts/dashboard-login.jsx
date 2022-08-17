import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { theme } from './dashboard-theme';

export const DashboardLoginLayout = ({ children }) => {
   return (
      <ThemeProvider theme={theme}>
         <Head>
            <title>Hiven Admin</title>
         </Head>
         {children}
      </ThemeProvider>
   );
};
