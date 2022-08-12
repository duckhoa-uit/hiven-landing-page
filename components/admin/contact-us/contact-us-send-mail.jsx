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
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
   sendMail: yup.string().required().email(),
});

export function ContactUsSendMailEdit({ onSave }) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

   const formMethods = useForm({
      defaultValues: {
         sendMail: 'send to this mail',      
      },
      resolver: yupResolver(schema), 
   });

   const {
      formState: { isSubmitting, errors },
      handleSubmit,
   } = formMethods;

   const handleSave = handleSubmit(async (values) => {
      console.log('🚀 ~ file Contact Us Send Mail.jsx ~ line 68 ~ handleSave ~ ̥', values);
      if (onSave) {
         const payload = { ...values };
         await onSave(payload);
      }
   });

   return (
      <Card sx={{ fontSize: 16 }}>
         <CardHeader title="Send To Mail" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  <Grid container columnSpacing={3} sx={{ mb: 2 }} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <TextInputField
                           disabled={isSubmitting}
                           name={`sendMail`}
                           label={`sendMail`}
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
