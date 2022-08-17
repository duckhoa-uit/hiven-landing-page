import axiosClient from '@components/api-client/axios-client';
import ImageUploadField from '@components/form-controls/image-upload-field';
import IconReportProblem from '@components/icons/ic-report-problem';
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
import axios from 'axios';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
   image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
});

export function NewsBannerEdit() {
   const hiven = useSelector((x) => x.hiven.data);

   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

   const formMethods = useForm({
      defaultValues: {
         image: {},
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting, errors },
      handleSubmit,
      reset,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         reset({ image: hiven.attributes.news_banner.data?.attributes || {} });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async ({ image }) => {
      try {
         let newImage;
         if (image.url) {
            newImage = {
               id: hiven.attributes.news_banner.data.id,
               ...image,
            };
         } else {
            const formData = new FormData();
            formData.append(`files`, image);
            const uploadImage = await axiosClient.post(`/upload`, formData);
            newImage = uploadImage[0];
         }

         const res = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               news_banner: newImage,
            },
         });
         toast.success('Update About Us Banner Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title="Banner" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} alignItems="center">
                     <Grid item xs={12}>
                        <ImageUploadField disabled={isSubmitting} name="image" />
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
