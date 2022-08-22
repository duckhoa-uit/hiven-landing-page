import ImageUploadField from '@components/form-controls/image-upload-field';
import TextInputField from '@components/form-controls/text-input-field';
import IconReportProblem from '@components/icons/ic-report-problem';
import axios from 'axios';
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
   Typography,
   Label,
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import axiosClient from '@components/api-client/axios-client';
import { toast } from 'react-toastify';
import { fetchHivenDetails } from '@utils/hivenSlice';

const schema = yup.object().shape({
   image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
});

export function ContactUsHexagonEdit({ onSave }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   const formMethods = useForm({
      defaultValues: {
         image: 'hexagon',
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
         reset({ image: hiven.attributes.contact_banner.data?.attributes || {} });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async ({ image }) => {
      if (!hiven.id) return;
      try {
         const formData = new FormData();
         formData.append(`files`, image);
         const res1 = await axiosClient.post(`/upload`, formData);
         const newImage = res1[0];

         const res = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               contact_banner: newImage,
            },
         });
         await dispatch(fetchHivenDetails());

         toast.success('Update Hexagon Image Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title="Hexagon Image" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid
                     key={1}
                     container
                     columnSpacing={3}
                     xs={12}
                     sx={{ mb: 4 }}
                     alignItems="center"
                  >
                     <Grid item xs={12}>
                        <ImageUploadField
                           disabled={isSubmitting}
                           name="image"
                           label="Image"
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
