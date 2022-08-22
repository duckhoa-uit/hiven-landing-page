import axiosClient from '@components/api-client/axios-client';
import TextInputField from '@components/form-controls/text-input-field';
import IconLogo from '@components/icons/logo';
import { DashboardLoginLayout } from '@components/layouts/dashboard-login';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object({
   identifier: yup.string().max(255).required('Identifier is required'),
   password: yup.string().max(255).required('Password is required'),
});

const AdminLogin = () => {
   const router = useRouter();

   const formMethods = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         identifier: '',
         password: '',
      },
   });
   const {
      handleSubmit,
      formState: { isSubmitting },
   } = formMethods;

   const onSubmit = handleSubmit(async (data) => {
      try {
         const payload = {
            identifier: data.identifier,
            password: data.password,
         };
         const { jwt, user } = await axiosClient.post('/auth/local', payload);
         localStorage.setItem('access_token', jwt);
         localStorage.setItem('user', user);
         router.push('/admin/home');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Box
         component="main"
         sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%',
         }}
      >
         <Container
            maxWidth="sm"
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               minHeight: '100vh',
            }}
         >
            <Card elevation={12}>
               <CardContent>
                  <FormProvider {...formMethods}>
                     <form onSubmit={onSubmit}>
                        <Box sx={{ textAlign: 'center', color: 'text.primary' }}>
                           <IconLogo />
                           <Typography mt={1.5} mb={3} variant="h3">
                              Sign in
                           </Typography>
                        </Box>

                        <TextInputField
                           name="identifier"
                           label="Identifier"
                           disabled={isSubmitting}
                        />
                        <TextInputField
                           name="password"
                           label="Password"
                           type="password"
                           disabled={isSubmitting}
                        />
                        <Box sx={{ py: 2 }}>
                           <Button
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              disabled={isSubmitting}
                           >
                              Sign In
                           </Button>
                        </Box>
                     </form>
                  </FormProvider>
               </CardContent>
            </Card>
         </Container>
      </Box>
   );
};
AdminLogin.Layout = DashboardLoginLayout;
export default AdminLogin;
