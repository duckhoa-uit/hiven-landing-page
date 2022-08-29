import axiosClient from '@components/api-client/axios-client';
import ImageUploadField from '@components/form-controls/image-upload-field';
import TextInputField from '@components/form-controls/text-input-field';
import IconReportProblem from '@components/icons/ic-report-problem';
import Loading from '@components/loading/loading';
import { yupResolver } from '@hookform/resolvers/yup';
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   Divider,
   Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
   name: yup.string().max(255).required(),
   address: yup.string().max(255).required(),
   x: yup.number().min(0).required().label('X axis').typeError('This field is required'),
   y: yup.number().min(0).required().label('Y axis').typeError('This field is required'),
   image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
});

export function RegionDetailsCard({ regionId }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const formMethods = useForm({
      defaultValues: {
         name: '',
         address: '',
         x: '',
         y: '',
         image: {},
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting, errors },
      reset,
      handleSubmit,
   } = formMethods;

   useEffect(() => {
      if (!regionId) return;

      (async () => {
         try {
            setLoading(true);
            const res = await axiosClient.get(`/countries/${regionId}?populate=*`);
            const details = res.data.attributes;

            reset({
               name: details.name,
               address: details.address,
               x: details.x,
               y: details.y,
               image: details.image?.data
                  ? {
                       id: details.image?.data?.id,
                       ...details.image?.data?.attributes,
                    }
                  : {},
            });
         } catch ({ error }) {
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
      })();
   }, [regionId]);

   const handleSave = handleSubmit(async (values) => {
      let newImage;
      if (values.image.url) {
         newImage = values.image;
      } else {
         try {
            const formData = new FormData();
            formData.append(`files`, values.image);
            const res = await axiosClient.post(`/upload`, formData);
            newImage = res[0];
         } catch ({ error }) {
            toast.error(error.message);
         }
      }

      if (regionId) {
         try {
            await axiosClient.put(`/countries/${regionId}`, {
               data: {
                  ...values,
                  image: newImage,
               },
            });

            toast.success('Update Investment Region Success.');
         } catch (error) {
            toast.error(error.message);
         }
      } else {
         try {
            await axiosClient.post(`/countries`, {
               data: {
                  ...values,
                  image: newImage,
               },
            });
            toast.success('Add Investment Region Success.');

            router.push('/admin/investment-area');
         } catch ({ error }) {
            toast.error(error.message);
         }
      }
   });

   if (loading)
      return (
         <Box
            sx={{
               width: '100%',
               height: 'calc(100vh - 200px)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Loading />
         </Box>
      );

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader
            title={regionId ? 'Investment Region Details' : 'Create Investment Region'}
         />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 4 }} alignItems="center">
                     <Grid item sm={12} md={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`name`}
                           label={'Name'}
                        />
                     </Grid>
                     <Grid item sm={12} md={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`address`}
                           label={'Address'}
                        />
                     </Grid>
                     <Grid item sm={12} md={6}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`x`}
                           label={'X axis'}
                           type="number"
                        />
                     </Grid>
                     <Grid item sm={12} md={6}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`y`}
                           label={'Y axis'}
                           type="number"
                        />
                     </Grid>
                     <Grid item sm={12} md={3} mt={2}>
                        <ImageUploadField disabled={isSubmitting} name={`image`} />
                     </Grid>
                  </Grid>
               </form>
            </FormProvider>
         </CardContent>
         <CardActions sx={{ mx: 2, mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
               <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSave}
                  disabled={isSubmitting}
               >
                  Save
               </Button>
            </Box>
         </CardActions>

         <ConfirmDialog
            icon={
               <Avatar
                  sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}
               >
                  <IconReportProblem />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to update this section?"
            onSubmit={handleSave}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </Card>
   );
}
