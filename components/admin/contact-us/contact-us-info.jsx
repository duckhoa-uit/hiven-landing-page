import ImageUploadField from '@components/form-controls/image-upload-field';
import TextInputField from '@components/form-controls/text-input-field';
import IconReportProblem from '@components/icons/ic-report-problem';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
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
import { useSelector } from 'react-redux';
import axiosClient from '@components/api-client/axios-client';
import { toast } from 'react-toastify';

const phoneRegExp =
   /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup.object().shape({
   contact_address: yup.string().max(1000).required(),
   contact_phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
   contact_email: yup.string().required().email(),
});

export function ContactUsInfoEdit() {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);

   const formMethods = useForm({
      defaultValues: {
         contact_address: 'address',
         contact_phone: 'phone number',
         contact_email: 'email to contact',
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting },
      handleSubmit,
      reset,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         reset({
            contact_address: hiven.attributes.contact_address || '',
            contact_phone: hiven.attributes.contact_phone || '',
            contact_email: hiven.attributes.contact_email || '',
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      if (!hiven.id) return;

      try {
         const res = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               contact_address: values.contact_address,
               contact_phone: values.contact_phone,
               contact_email: values.contact_email,
            },
         });
         toast.success('Update Contact Information Success.');
      } catch ({ error }) {
         console.log('errro', error);
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader title="Contact Us Information" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`contact_address`}
                           label={`Address`}
                           multiline
                           rows={4}
                        />
                     </Grid>
                  </Grid>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`contact_phone`}
                           label={`Phone Number`}
                        />
                     </Grid>
                  </Grid>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`contact_email`}
                           label={'Email'}
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
