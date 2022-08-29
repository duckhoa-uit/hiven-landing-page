import axiosClient from '@components/api-client/axios-client';
import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog';
import IconAdd from '@components/icons/ic-add';
import IconPencil from '@components/icons/ic-pencil';
import IconReportProblem from '@components/icons/ic-report-problem';
import IconTrash from '@components/icons/ic-trash';
import { DashboardLayout } from '@components/layouts/dashboard-layout';
import {
   Avatar,
   Button,
   Card,
   CardHeader,
   Container,
   IconButton,
   Skeleton,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Tooltip,
   Typography,
   Box,
} from '@mui/material';
import { formatDate } from '@utils/helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const headCells = [
   {
      id: 'name',
      align: 'left',
      label: 'Name',
   },
   {
      id: 'address',
      align: 'left',
      label: 'Address',
   },
   {
      id: 'created_at',
      align: 'center',
      label: 'Created At',
   },
   {
      id: 'actions',
      align: 'right',
      label: 'Actions',
   },
];

const AdminInvestmentArea = () => {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const [selectedId, setSelectedId] = useState('');
   const [loading, setLoading] = useState(false);
   const [regions, setRegions] = useState([]);
   const router = useRouter();

   useEffect(() => {
      (async () => {
         await loadInvestmentAreas();
      })();
   }, []);

   const loadInvestmentAreas = async () => {
      setLoading(true);
      try {
         const result = await axiosClient.get(`/countries?populate=*`);
         setRegions(result.data.map((item) => ({ id: item.id, ...item.attributes })));
      } catch ({ error }) {
         console.log(
            '🚀 ~ file: index.jsx ~ line 20 ~ handleLoadInvestmentArea ~ error',
            error
         );
         toast.error(error.message);
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async () => {
      setOpenConfirmDialog(false);

      setLoading(true);
      try {
         // await dispatch(deleteNews(selectedId));
         await axiosClient.delete(`/countries/${selectedId}`);
         await loadInvestmentAreas();

         toast.success('Delete region success.');
      } catch ({ error }) {
         toast.error(error.message);
         console.log(error);
      }
      setLoading(false);

      setSelectedId('');
   };
   return (
      <Box
         component="main"
         sx={{
            flexGrow: 1,
            pt: 6,
            pb: 12,
            px: 6,
         }}
      >
         <Container maxWidth={false}>
            <Card>
               <CardHeader
                  title={
                     <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                     >
                        <Typography variant="h4">Investment Areas</Typography>
                        <Button
                           startIcon={<IconAdd />}
                           variant="contained"
                           onClick={() => router.push('/admin/investment-area/create')}
                        >
                           Add
                        </Button>
                     </Stack>
                  }
               />
               <Box sx={{ overflowX: 'scroll' }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           {headCells.map((cell) => (
                              <TableCell key={cell.id} align={cell.align}>
                                 {cell.label}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {!loading && regions
                           ? regions.map((region) => (
                                <TableRow hover key={region.id}>
                                   <TableCell align="left">
                                      <Box
                                         sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                         }}
                                      >
                                         <Typography
                                            sx={{
                                               fontWeight: 500,
                                               whiteSpace: 'nowrap',
                                               overflow: 'hidden',
                                               textOverflow: 'ellipsis',
                                               maxWidth: '20ch',
                                            }}
                                            color="textPrimary"
                                            variant="body2"
                                         >
                                            {region.name || 'N/A'}
                                         </Typography>
                                      </Box>
                                   </TableCell>
                                   <TableCell
                                      align="left"
                                      sx={{
                                         whiteSpace: 'nowrap',
                                         overflow: 'hidden',
                                         textOverflow: 'ellipsis',
                                         maxWidth: '40ch',
                                      }}
                                   >
                                      {region.address}
                                   </TableCell>
                                   <TableCell align="center">
                                      {formatDate(region.createdAt)}
                                   </TableCell>

                                   <TableCell align="center">
                                      <Stack direction="row" justifyContent="flex-end">
                                         <Tooltip title="Delete" placement="top">
                                            <IconButton
                                               size="small"
                                               onClick={() => {
                                                  setSelectedId(region.id);
                                                  setOpenConfirmDialog(true);
                                               }}
                                            >
                                               <IconTrash width={20} />
                                            </IconButton>
                                         </Tooltip>
                                         <Link
                                            href={`/admin/investment-area/${region.id}`}
                                            passHref
                                         >
                                            <Tooltip title="View Details" placement="top">
                                               <IconButton size="small">
                                                  <IconPencil width={20} />
                                               </IconButton>
                                            </Tooltip>
                                         </Link>
                                      </Stack>
                                   </TableCell>
                                </TableRow>
                             ))
                           : Array.from(new Array(10)).map((item, idx) => (
                                <TableRow hover key={idx}>
                                   <TableCell align="center">
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell align="center">
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell align="center">
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell align="center">
                                      <Skeleton variant="text" />
                                   </TableCell>
                                </TableRow>
                             ))}
                     </TableBody>
                  </Table>
               </Box>

               <ConfirmDialog
                  icon={
                     <Avatar
                        sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: '#c32f5b' }}
                     >
                        <IconReportProblem />
                     </Avatar>
                  }
                  isOpen={openConfirmDialog}
                  title="Are you sure?"
                  body="Are you sure to delete this region?"
                  onSubmit={handleDelete}
                  onClose={() => {
                     setSelectedId('');
                     setOpenConfirmDialog(false);
                  }}
               />
            </Card>
         </Container>
      </Box>
   );
};
AdminInvestmentArea.Layout = DashboardLayout;
export default AdminInvestmentArea;
