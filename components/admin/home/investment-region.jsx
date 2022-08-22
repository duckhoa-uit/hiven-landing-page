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
import { fetchHivenDetails } from '@utils/hivenSlice';
import axios from 'axios';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
   content: yup.array().of(
      yup.object().shape({
         title: yup.string().max(255).required(),
         description: yup.string().max(255).required('This field is required.'),
         image: yup
            .mixed()
            .test('required', 'Please select an image', (value) => value?.size),
      })
   ),
});

const labels = [
   'Singapore',
   'Vietnam',
   'Indonesia',
   'Malaysia',
   'Thailand',
   'Philippines',
];

export function InvestmentEdit() {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   const formMethods = useForm({
      defaultValues: {
         content: [
            {
               title: 'Singapore',
               description: '',
               image: {},
            },
            {
               title: 'Vietnam',
               description: '',
               image: {},
            },
            {
               title: 'Indonesia',
               description: '',
               image: {},
            },
            {
               title: 'Malaysia',
               description: '',
               image: {},
            },
            {
               title: 'Thailand',
               description: '',
               image: {},
            },
            {
               title: 'Philippines',
               description: '',
               image: {},
            },
         ],
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting, errors },
      reset,
      handleSubmit,
   } = formMethods;

   useEffect(() => {
      const formData = hiven.attributes?.investment_region
         ? hiven.attributes.investment_region.map((region) => ({
              title: region.title,
              description: region.description,
              image: region.image ? region.image.data.attributes : {},
           }))
         : [];

      reset({
         content: formData,
      });
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      const updatedBanners = values.content.map(async (region, idx) => {
         if (region.image.url) {
            return {
               id: hiven.attributes.investment_region[idx].image.data.id,
               ...region.image,
            };
         }

         try {
            const formData = new FormData();
            formData.append(`files`, region.image);
            const res = await axiosClient.post(`/upload`, formData);
            return res[0];
         } catch ({ error }) {
            toast.error(error.message);
         }
      });
      const uploadedBanners = await Promise.all(updatedBanners);

      try {
         await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               investment_region: values.content.map((region, idx) => ({
                  ...region,
                  image: uploadedBanners[idx],
               })),
            },
         });
         await dispatch(fetchHivenDetails());

         toast.success('Update Investment Region Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader title="Investment Region" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  {Array.from(new Array(6)).map((_, idx) => (
                     <>
                        {idx !== 0 && <Divider />}
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h5">
                           {labels[idx]}
                        </Typography>
                        <Grid
                           key={idx}
                           container
                           columnSpacing={3}
                           sx={{ mb: 4 }}
                           alignItems="center"
                        >
                           <Grid item sm={12} md={3}>
                              <ImageUploadField
                                 disabled={isSubmitting}
                                 name={`content.${idx}.image`}
                                 label="Main Content"
                              />
                           </Grid>
                           <Grid item sm={12} md={9}>
                              <TextInputField
                                 disabled={isSubmitting}
                                 name={`content.${idx}.description`}
                                 label={'Address'}
                              />
                           </Grid>
                        </Grid>
                     </>
                  ))}
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
