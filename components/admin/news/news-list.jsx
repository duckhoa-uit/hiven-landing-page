import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog';
import IconAdd from '@components/icons/ic-add';
import IconPencil from '@components/icons/ic-pencil';
import IconReportProblem from '@components/icons/ic-report-problem';
import IconTrash from '@components/icons/ic-trash';
import {
   Avatar,
   Box,
   Button,
   Card,
   CardHeader,
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
} from '@mui/material';
import { formatDate } from '@utils/helper';
import { deleteNews } from '@utils/hivenSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const headCells = [
   {
      id: 'title',
      align: 'left',
      label: 'Title',
   },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Created At',
   },
   {
      id: 'content',
      align: 'center',
      label: 'Content',
   },
   {
      id: 'link',
      align: 'left',
      label: 'Link',
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Actions',
   },
];

export default function NewsList() {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const [selectedId, setSelectedId] = useState('');
   const [loading, setLoading] = useState(false);
   const newsList = useSelector((x) => x.hiven.news);
   const dispatch = useDispatch();
   const router = useRouter();

   const handleDelete = async () => {
      setOpenConfirmDialog(false);

      setLoading(true);
      await dispatch(deleteNews(selectedId));
      setLoading(false);

      setSelectedId('');
   };

   return (
      <Card sx={{ mt: 4 }}>
         <CardHeader
            title={
               <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4">News List</Typography>
                  <Button
                     startIcon={<IconAdd />}
                     variant="contained"
                     onClick={() => router.push('/admin/news/create')}
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
                  {!loading && newsList
                     ? newsList.map((news) => (
                          <TableRow hover key={news.id}>
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
                                      {news.title || 'N/A'}
                                   </Typography>
                                </Box>
                             </TableCell>
                             <TableCell align="center" sx={{ width: 200 }}>
                                {formatDate(news.createdAt)}
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
                                {news.content}
                             </TableCell>
                             <TableCell align="left">
                                <Link href={news.link} passHref>
                                   <a target="_blank">
                                      <Typography
                                         color={'primary.light'}
                                         style={{
                                            fontSize: 14,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '30ch',
                                         }}
                                      >
                                         {news.link}
                                      </Typography>
                                   </a>
                                </Link>
                             </TableCell>

                             <TableCell align="center">
                                <Stack direction="row">
                                   <Tooltip title="Delete" placement="top">
                                      <IconButton
                                         size="small"
                                         onClick={() => {
                                            setSelectedId(news.id);
                                            setOpenConfirmDialog(true);
                                         }}
                                      >
                                         <IconTrash width={20} />
                                      </IconButton>
                                   </Tooltip>
                                   <Link href={`/admin/news/${news.id}`} passHref>
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
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: '#c32f5b' }}>
                  <IconReportProblem />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this news?"
            onSubmit={handleDelete}
            onClose={() => {
               setSelectedId('');
               setOpenConfirmDialog(false);
            }}
         />
      </Card>
   );
}
