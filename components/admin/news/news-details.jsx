import ImageUploadField from '@components/form-controls/image-upload-field';
import TextInputField from '@components/form-controls/text-input-field';
import IconReportProblem from '@components/icons/ic-report-problem';
import { yupResolver } from '@hookform/resolvers/yup';
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   CircularProgress,
   Divider,
   Grid,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import axiosClient from '@components/api-client/axios-client';
import Loading from '@components/loading/loading';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchHivenNews } from '@utils/hivenSlice';

const schema = yup.object().shape({
   title: yup.string().required(),
   content: yup.string().required(),
   link: yup.string().url().required(),
   image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
});

export function NewsDetailsCard({ newId }) {
   const dispatch = useDispatch();
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const formMethods = useForm({
      defaultValues: {
         title: '',
         content: '',
         link: '',
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
      if (!newId) return;

      (async () => {
         try {
            setLoading(true);
            const res = await axiosClient.get(`/news/${newId}?populate=*`);
            const newDetails = res.data.attributes;

            reset({
               title: newDetails.title,
               content: newDetails.content,
               link: newDetails.link,
               image: newDetails.image?.data
                  ? {
                       id: newDetails.image?.data[0]?.id,
                       ...newDetails.image?.data[0]?.attributes,
                    }
                  : {},
            });
         } catch ({ error }) {
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
      })();
   }, [newId]);

   const handleSave = handleSubmit(async (values) => {
      const newImage = await (async () => {
         if (values.image.url) return values.image;

         try {
            const formData = new FormData();
            formData.append(`files`, values.image);
            const res = await axiosClient.post(`/upload`, formData);
            return res[0];
         } catch (error) {
            console.log(error);
         }
      })();

      if (newId) {
         try {
            const res = await axiosClient.put(`/news/${newId}`, {
               data: {
                  ...values,
                  image: newImage,
               },
            });
            await dispatch(fetchHivenNews());
            toast.success('Update News Success.');
         } catch (error) {
            toast.error(error.message);
         }
      } else {
         try {
            const res = await axiosClient.post(`/news`, {
               data: {
                  ...values,
                  image: newImage,
               },
            });
            await dispatch(fetchHivenNews());
            toast.success('Add News Success.');
            router.push('/admin/news');
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
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title={newId ? 'News Details' : 'Create News'} />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }}>
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name="title"
                           label="Title"
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name="link"
                           label="Link"
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name="content"
                           label="Content"
                           multiline
                           rows={4}
                        />
                     </Grid>
                     <Grid item md={12} xs={12} sx={{ mt: 1 }}>
                        <ImageUploadField
                           disabled={isSubmitting}
                           name={`image`}
                           label="Main Content"
                        />
                     </Grid>
                  </Grid>
               </form>
            </FormProvider>
         </CardContent>
         <CardActions sx={{ m: 2, justifyContent: 'space-between' }}>
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
