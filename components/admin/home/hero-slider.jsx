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
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';

const schema = yup.object().shape({
   content: yup.string().required(),
   images: yup
      .array()
      .of(yup.mixed().test('required', 'Please select an image', (value) => value?.size)),
});

export function HeroSliderEdit({ onSubmit }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);

   const formMethods = useForm({
      defaultValues: {
         content: '',
         images: [],
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting, errors },
      reset,
      handleSubmit,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         reset({
            content: hiven.attributes.hero_slider?.subtitle || '',
            images: hiven.attributes.hero_slider?.banners?.data
               ? (hiven.attributes.hero_slider?.banners?.data).map((i) => i.attributes)
               : [],
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      if (!hiven.id) return;

      console.log('🚀 ~ file: hero-slider.jsx ~ line 68 ~ handleSave ~ ̥', values);
      const updatedBanners = values.images.map(async (image, idx) => {
         if (image.url)
            return {
               id: hiven.attributes.hero_slider?.banners[idx].id,
               ...image,
            };

         try {
            const formData = new FormData();
            formData.append(`files`, image);
            const res = await axios.post(`/upload`, formData, {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            });
            return res.data[0];
         } catch (error) {
            console.log(error);
         }
      });

      const uploadedBanners = await Promise.all(updatedBanners);

      try {
         const res = await axios.put(
            `/hivens/${hiven.id}`,
            {
               data: {
                  hero_slider: {
                     subtitle: values.content,
                     banners: uploadedBanners,
                  },
               },
            },
            {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            }
         );
         console.log('🚀 ~ file: hero-slider.jsx ~ line 76 ~ handleSave ~ res', res);
      } catch (error) {
         console.log(error);
      }
   });

   return (
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title="Hero Slider" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }}>
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name="content"
                           label="Subtitle"
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
                           md={6} xl={3}
                           alignItems="center"
                        >
                           <Grid item xs={12}>
                              <ImageUploadField
                                 disabled={isSubmitting}
                                 name={`images.${idx}`}
                                 label="Main Content"
                                 multiline
                                 rows={4}
                              />
                           </Grid>
                           <Grid item xs={11} alignItems="center">
                              <label name={`images.${idx}.description`}>
                                 {`Image ${idx + 1}`}
                              </label>
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
