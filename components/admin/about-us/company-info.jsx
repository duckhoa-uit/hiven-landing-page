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
   Label
} from '@mui/material';
import { Box } from '@mui/system';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';

const schema = yup.object().shape({
   content: yup.array().of(
      yup.object().shape({
         url: yup
            .string()
            .required()
            .matches(
               /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
            ),
         description: yup.string().required().label('Description'),  
         logo: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
         image: yup.mixed().test('required', 'Please select an image', (value) => value?.size),
      })
   ),  
});

export function CompanyInfoEdit({ onSave }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);

   const formMethods = useForm({   
      resolver: yupResolver(schema),
      defaultValues: {
         content: [
            {
               url: '',
               description: '',
               logo: {},
               image: {},         
            },
            {
               url: '',
               description: '',
               logo: {},
               image: {},         
            }
         ] 
       }
   });

   const {
      formState: { isSubmitting, errors },
      handleSubmit,
      reset,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         const formData = hiven.attributes.corporate_profile
         ? hiven.attributes.corporate_profile.map((content) => ({
               url: content.url,
               description: content.description,
               logo: content.logo.data.attributes,
               image: content.image.data.attributes,
           }))
         : [];

         reset({
            content: formData,
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      {JSON.stringify(values)}
      if (!hiven.id) return;

      console.log('🚀 ~ file CompanyInfoEdit.jsx ~ line 68 ~ handleSave ~ ̥', values);
      if (onSave) {
         const payload = { ...values };
         await onSave(payload);
      }    

      const updatedImage = values.content.map(async (ct, idx) => {
         if (ct.image.url) {
            return {
               id: hiven.attributes.corporate_profile[idx].image.data.id,
               ...ct.image,
            };
         }
         try {
            const formDataImage = new FormData();
            formDataImage.append(`files`, ct.image);
            const resImg = await axios.post(`/upload`, formDataImage, {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            });
            return resImg.data[0];
         } catch (error) {
            console.log(error);
         }
      });

      const updatedLogo = values.content.map(async (ct, idx) => {
         if (ct.logo.url) {
            return {
               id: hiven.attributes.corporate_profile[idx].logo.data.id,
               ...ct.logo,
            };
         }
         try {
            const formDataLogo = new FormData();
            formDataLogo.append(`files`, ct.logo);
            const resLg = await axios.post(`/upload`, formDataLogo, {
               baseURL: 'https://hiven-api.herokuapp.com/api',
            });
            return resLg.data[0];
         } catch (error) {
            console.log(error);
         }
      });

      const uploadedupdatedImage = await Promise.all(updatedImage);
      const uploadedupdatedLogo = await Promise.all(updatedLogo);

      try { 
         const titleRes = await axios.put(
            `/hivens/${hiven.id}`,
            {
               data: {
                  corporate_profile: values.content.map((item,index) => {
                     return{
                        url: item.url,
                        description: item.description,
                        logo: uploadedupdatedLogo[index],
                        image: uploadedupdatedImage[index],
                     }
                  })
               }
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
         <CardHeader title="Corporate Profile" />
         <Divider />
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
               {Array.from(new Array(2)).map((_, idx) => (
               <CardContent key={idx}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`content.${idx}.url`}
                           label={`url`}
                           multiline
                           rows={4}
                        />
                     </Grid>
                  </Grid>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`content.${idx}.description`}
                           label={`description`}
                           multiline
                           rows={4}
                        />
                     </Grid>
                  </Grid>
                  <Divider />

                  <Typography sx={{mb:4}}variant="subtitle1">Images</Typography>
                  <Grid
                     sm={12}
                     container
                     columnSpacing={3}
                     Spacing={3}
                     sx={{ mb: 4, ml: 1}}
                     alignItems="center"
                  >
                     <Grid
                        sm={12} md={6}
                        container
                        columnSpacing={3}
                        sx={{ mb: 4 }}
                        alignItems="center"
                     >
                        <Grid item xs={12}>
                           <ImageUploadField
                              disabled={isSubmitting}
                              name={`content.${idx}.logo`}
                              label="logo"
                              multiline
                              rows={4}
                           />
                        </Grid>
                        <Grid item xs={12} alignItems="center">
                           <label>
                                 {`logo`}
                           </label>
                        </Grid>
                     </Grid>

                     <Grid
                        sm={12} md={6}
                        container
                        columnSpacing={3}
                        sx={{ mb: 4 }}
                        alignItems="center"
                     >
                        <Grid item xs={12}>
                           <ImageUploadField
                              disabled={isSubmitting}
                              name={`content.${idx}.image`}
                              label="image"
                              multiline
                              rows={4}
                           />
                        </Grid>
                        <Grid item xs={12} alignItems="center">
                           <label>
                                 {`image`}
                           </label>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Divider />
               </CardContent>
               ))}
               </form>
            </FormProvider>
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
