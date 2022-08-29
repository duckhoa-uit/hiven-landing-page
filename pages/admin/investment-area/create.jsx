import { RegionDetailsCard } from '@components/admin/investment-region/region-details-card';
import IconGoBack from '@components/icons/ic-go-back';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import { Box, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

const AdminRegionCreate = () => {
   const router = useRouter();

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
            <Box sx={{ mb: 2 }}>
               <Button
                  startIcon={<IconGoBack />}
                  onClick={() => router.push('/admin/investment-area')}
               >
                  Back
               </Button>
            </Box>
            <RegionDetailsCard />
         </Container>
      </Box>
   );
};
AdminRegionCreate.Layout = DashboardLayout;
export default AdminRegionCreate;
