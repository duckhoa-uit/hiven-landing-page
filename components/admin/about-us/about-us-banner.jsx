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
   Typography,
   Label,
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

const schema = yup.object().shape({
   images: yup.array().of(
      yup.object().shape({
         image: yup
            .mixed()
            .test('required', 'Please select an image', (value) => value?.size),
      })
   ),
});

export function AboutUsBannerEdit({ onSave }) {
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
         reset({ image: hiven.attributes.about_us_banner.data?.attributes || {} });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      console.log('🚀 ~ file: about-us-banner.jsx ~ line 56 ~ handleSave ~ ̥', values);

      try {
         const formData = new FormData();
         formData.append(`files`, values.image);
         const res1 = await axios.post(`/upload`, formData, {
            baseURL: 'https://hiven-api.herokuapp.com/api',
         });
         const newImage = res1.data[0];

         const res = await axios.put(
            `/hivens/${hiven.id}`,
            {
               data: {
                  about_us_banner: newImage,
               },
            },
            {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            }
         );
      } catch (error) {
         console.log(error);
      }
   });

   return (
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title="Banner" />
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
                     <Grid item xs={12}>
                        <ImageUploadField
                           disabled={isSubmitting}
                           name="image"
                           label="Main Content"
                           multiline
                           rows={12}
                        />
                     </Grid>
                     <Grid item xs={12} alignItems="center">
                        <label
                           name="image"
                           //   label={`Image-${idx+1}'s description`}
                        >
                           {`Image`}
                        </label>
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
