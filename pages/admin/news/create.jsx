import { NewsDetailsCard } from '@components/admin/news/news-details';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Container } from '@mui/material';

const NewDetails = () => {
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
            <NewsDetailsCard />
         </Container>
      </Box>
   );
};
NewDetails.Layout = DashboardLayout;
export default NewDetails;
