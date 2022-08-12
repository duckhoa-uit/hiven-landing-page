import { AboutUsBannerEdit } from '@components/admin/about-us/about-us-banner';
import { CompanyInfoEdit    } from '@components/admin/about-us/company-info';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';
import React from 'react';

const AdminAboutUs = () => {
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
            <AboutUsBannerEdit />
            <br/>
            <CompanyInfoEdit />
         </Container>
      </Box>
   );
};
AdminAboutUs.Layout = DashboardLayout;
export default AdminAboutUs;
