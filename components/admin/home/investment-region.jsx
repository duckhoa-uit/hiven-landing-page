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
import axios from 'axios';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const schema = yup.object().shape({
   content: yup.array().of(
      yup.object().shape({
         title: yup.string().max(255).required(),
         description: yup.string().max(255).required('This field is required.'),
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

   const formMethods = useForm({
      defaultValues: {
         content: [
            {
               title: 'Singapore',
               description: '',
            },
            {
               title: 'Vietnam',
               description: '',
            },
            {
               title: 'Indonesia',
               description: '',
            },
            {
               title: 'Malaysia',
               description: '',
            },
            {
               title: 'Thailand',
               description: '',
            },
            {
               title: 'Philippines',
               description: '',
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
      const formData = hiven.attributes.investment_region
         ? hiven.attributes.investment_region.map((region) => ({
              title: region.title,
              description: region.description,
           }))
         : [];

      console.log('formData: ', formData);

      reset({
         content: formData,
      });
   }, [hiven?.id]);

   const handleSave = handleSubmit(async (values) => {
      try {
         const res = await axios.put(
            `/hivens/${hiven.id}`,
            {
               data: {
                  investment_region: values.content,
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
         <CardHeader title="Investment Region" />
         <Divider />
         <CardContent>
            <FormProvider {...formMethods}>
               <form onSubmit={handleSubmit(handleSave)}>
                  {Array.from(new Array(6)).map((_, idx) => (
                     <Grid
                        key={idx}
                        container
                        columnSpacing={3}
                        sx={{ mb: 2 }}
                        alignItems="center"
                     >
                        <Grid item md={12} xs={12}>
                           <TextInputField
                              disabled={isSubmitting}
                              name={`content.${idx}.description`}
                              label={labels[idx]}
                           />
                        </Grid>
                     </Grid>
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
