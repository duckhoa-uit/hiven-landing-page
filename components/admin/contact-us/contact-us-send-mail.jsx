import axiosClient from '@components/api-client/axios-client';
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
   email: yup.string().required().email(),
});

export function ContactUsSendMailEdit({ onSave }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   const formMethods = useForm({
      defaultValues: {
         email: '',
      },
      resolver: yupResolver(schema),
   });

   const {
      formState: { isSubmitting },
      reset,
      handleSubmit,
   } = formMethods;

   useEffect(() => {
      if (hiven?.id) {
         reset({
            email: hiven.attributes.contact_form_email_receive || '',
         });
      }
   }, [hiven?.id]);

   const handleSave = handleSubmit(async ({ email }) => {
      if (!hiven.id) return;

      try {
         const res = await axiosClient.put(`/hivens/${hiven.id}`, {
            data: {
               contact_form_email_receive: email,
            },
         });
         await dispatch(fetchHivenDetails());

         toast.success('Update Email Receive Contact Form Success.');
      } catch ({ error }) {
         toast.error(error.message);
      }
   });

   return (
      <Card sx={{ fontSize: 16, mt: 4 }}>
         <CardHeader title="Email Receive Contact Form" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`email`}
                           label="Email"
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
