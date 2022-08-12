import { NewsDetailsCard } from '@components/admin/news/news-details';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const NewDetails = () => {
   const router = useRouter();
   const { newId } = router.query;

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
            <NewsDetailsCard newId={newId} />
         </Container>
      </Box>
   );
};
NewDetails.Layout = DashboardLayout;
export default NewDetails;
