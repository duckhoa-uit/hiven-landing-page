import { AboutUsBannerEdit } from '@components/admin/about-us/about-us-banner';
import { CompanyInfoEdit    } from '@components/admin/about-us/company-info';
import { ContactUsHexagonEdit } from '@components/admin/contact-us/contact-us-hexagon';
import { ContactUsInfoEdit } from '@components/admin/contact-us/contact-us-info';
import { ContactUsSendMailEdit } from '@components/admin/contact-us/contact-us-send-mail';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';
import React from 'react';

const AdminContact = () => {
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
            <ContactUsHexagonEdit />
            <br/>
            <ContactUsInfoEdit />
            <br/>
            <ContactUsSendMailEdit />
         </Container>
      </Box>
   );
};
AdminContact.Layout = DashboardLayout;
export default AdminContact;
