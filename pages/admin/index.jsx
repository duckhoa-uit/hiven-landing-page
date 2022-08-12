import { BusinessAreaEdit } from '@components/admin/home/business-area';
import { HeroSliderEdit } from '@components/admin/home/hero-slider';
import { InvestmentEdit } from '@components/admin/home/investment-region';
import { MissionAndValueEdit } from '@components/admin/home/mission-value';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const AdminHome = () => {
   return (
      <Box
         component="main"
         sx={{
            flexGrow: 1,
            pt: 6,
            pb: 12,
            px: 6,
         }}
      >
         <Container maxWidth={false}>
            <HeroSliderEdit />
            <MissionAndValueEdit />
            <BusinessAreaEdit />
            <InvestmentEdit />
         </Container>
      </Box>
   );
};
AdminHome.Layout = DashboardLayout;
export default AdminHome;
