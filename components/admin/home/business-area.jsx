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
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

export function BusinessAreaEdit({ onSave }) {
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
         console.log(hiven.attributes.business_area_images);
         const formData = hiven.attributes.business_area_images
            ? hiven.attributes.business_area_images.map((image) => ({
                 image: image.image.data.attributes,
                 title: image.title,
              }))
            : [];

         console.log('formData: ', formData);

         reset({
            contentBusiness: hiven.attributes.business_area_content || '',
            imagesBusiness: formData,
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      if (!hiven.id) return;

      console.log(values);
      const updatedBanners = values.imagesBusiness.map(async (image, idx) => {
         if (image.image.url) {
            console.log(hiven.attributes.business_area_images[idx]);
            return {
               id: hiven.attributes.business_area_images[idx].image.data.id,
               ...image.image,
            };
         }
         try {
            const formData = new FormData();
            formData.append(`files`, image.image);
            const res = await axios.post(`/upload`, formData, {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            });
            console.log(res.data[0]);
            return res.data[0];
         } catch (error) {
            console.log(error);
         }
      });
      const uploadedBanners = await Promise.all(updatedBanners);
      try {
         const titleRes = await axios.put(
            `/hivens/${hiven.id}`,
            {
               data: {
                  business_area_content: values.contentBusiness,
                  business_area_images: values.imagesBusiness.map((item, index) => {
                     return {
                        image: uploadedBanners[index],
                        title: item.title,
                     };
                  }),
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
                  <Grid container columnSpacing={3} sx={{ ml: 1 }} alignItems="center">
                     {Array.from(new Array(4)).map((_, idx) => (
                        <Grid
                           key={idx}
                           container
                           columnSpacing={3}
                           sx={{ mb: 4 }}
                           md={6}
                           xl={3}
                           alignItems="center"
                        >
                           <Grid item xs={12}>
                              <ImageUploadField
                                 disabled={isSubmitting}
                                 name={`imagesBusiness.${idx}.image`}
                                 label="Main Content"
                                 multiline
                                 rows={4}
                              />
                           </Grid>
                           <Grid item xs={11} alignItems="center">
                              <TextInputField
                                 name={`imagesBusiness.${idx}.title`}
                                 label={`Images-${idx + 1}'s title`}
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
