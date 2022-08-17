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
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
   contentBusiness: yup.string().required(),
   imagesBusiness: yup.array().of(
      yup.object().shape({
         image: yup
            .mixed()
            .test('required', 'Please select an image', (value) => value?.size),
         title: yup.string().max(255).required().label('title'),
      })
   ),
});

export function BusinessAreaEdit() {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);

   const formMethods = useForm({
      defaultValues: {
         contentBusiness: 'Heloo',
         imagesBusiness: [
            {
               image: {},
               title: '',
            },
            {
               image: {},
               title: '',
            },
            {
               image: {},
               title: '',
            },
            {
               image: {},
               title: '',
            },
         ],
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
         const formData = hiven.attributes.business_area_images
            ? hiven.attributes.business_area_images.map((image) => ({
                 image: image.image.data?.attributes || {},
                 title: image.title,
              }))
            : [];

         reset({
            contentBusiness: hiven.attributes.business_area_content || '',
            imagesBusiness: formData,
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      if (!hiven.id) return;

      const updatedBanners = values.imagesBusiness.map(async (image, idx) => {
         if (image.image.url) {
            return {
               id: hiven.attributes.business_area_images[idx].image.data.id,
               ...image.image,
            };
         }
         try {
            const formData = new FormData();
            formData.append(`files`, image.image);
            const res = await axiosClient.post(`/upload`, formData);
            return res[0];
         } catch (error) {
            console.log(error);
         }
      });
      const uploadedBanners = await Promise.all(updatedBanners);
      try {
         const titleRes = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               business_area_content: values.contentBusiness,
               business_area_images: values.imagesBusiness.map((item, index) => {
                  return {
                     image: uploadedBanners[index],
                     title: item.title,
                  };
               }),
            },
         });
         toast.success('Update Business Area Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader title="Business Area" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }}>
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name="contentBusiness"
                           label="Main Content"
                           multiline
                           rows={4}
                        />
                     </Grid>
                  </Grid>
                  <Divider />
                  <Typography sx={{ mb: 4 }} variant="subtitle1">
                     Images
                  </Typography>
                  <Grid
                     container
                     columnSpacing={3}
                     sx={{ pl: 3 }}
                     justifyContent="center"
                     alignItems="center"
                  >
                     {Array.from(new Array(4)).map((_, idx) => (
                        <Grid
                           key={idx}
                           container
                           spacing={3}
                           sx={{ mb: 4 }}
                           alignItems="center"
                        >
                           <Grid item sm={12} md={3}>
                              <ImageUploadField
                                 disabled={isSubmitting}
                                 name={`imagesBusiness.${idx}.image`}
                                 label="Main Content"
                              />
                           </Grid>
                           <Grid item sm={12} md={9}>
                              <TextInputField
                                 name={`imagesBusiness.${idx}.title`}
                                 label={`Images ${idx + 1}'s title`}
                                 disabled={isSubmitting}
                              />
                           </Grid>
                        </Grid>
                     ))}
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
