import axiosClient from '@components/api-client/axios-client';
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
   Divider,
   Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { fetchHivenDetails } from '@utils/hivenSlice';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
   image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
   title: yup.string().max(255).required().label('title'),
});

export function MissionAndValueEdit() {
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

   const formMethods = useForm({
      defaultValues: {
         image: {},
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting, isDirty },
      reset,
      handleSubmit,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         console.log(hiven.attributes);
         reset({
            image: hiven.attributes.mission_value?.image.data?.attributes || {},
            title: hiven.attributes.mission_value?.title,
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async ({ image, title }) => {
      if (!hiven.id) return;

      console.log('img', image);
      console.log('title', title);

      try {
         let newImage;
         if (image.url) {
            newImage = {
               id: hiven.attributes.mission_value.image.data.id,
               ...image,
            };
         } else {
            const formData = new FormData();
            formData.append(`files`, image);
            const uploadImage = await axiosClient.post(`/upload`, formData);
            newImage = uploadImage[0];
         }
         if (newImage) console.log(newImage);
         const res = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               mission_value: {
                  image: newImage,
                  title: title,
               },
            },
         });
         await dispatch(fetchHivenDetails());
         toast.success('Update Mission & Value Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader title="Mission & Value" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid
                     key={1}
                     container
                     columnSpacing={3}
                     sx={{ mb: 4 }}
                     alignItems="center"
                  >
                     <Grid item xs={12} md={3}>
                        <ImageUploadField
                           disabled={isSubmitting}
                           name="image"
                           label="Main Content"
                        />
                     </Grid>
                     <Grid item sm={12} md={9} sx={{ mt: 2 }}>
                        <TextInputField
                           name={`title`}
                           label={`content`}
                           disabled={isSubmitting}
                           multiline
                           rows={4}
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
