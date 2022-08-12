import { NewsBannerEdit } from '@components/admin/news/news-banner';
import NewsList from '@components/admin/news/news-list';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';
import React from 'react';

const AdminNews = () => {
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
            <NewsBannerEdit />
            <NewsList />
         </Container>
      </Box>
   );
};
AdminNews.Layout = DashboardLayout;
export default AdminNews;
