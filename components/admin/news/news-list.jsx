import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog';
import IconPencil from '@components/icons/ic-pencil';
import IconReportProblem from '@components/icons/ic-report-problem';
import IconTrash from '@components/icons/ic-trash';
import {
   Avatar,
   Box,
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
      align: 'center',
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
   const newsList = useSelector((x) => x.hiven.news);
   const dispatch = useDispatch();
   console.log('newsList', newsList);

   const handleDelete = async (id) => {
      await dispatch(deleteNews(id));
      setOpenConfirmDialog(false);
   };

   return (
      <Card sx={{ mt: 4 }}>
         <CardHeader title="News List" />
         <Box sx={{ minWidth: 1050 }}>
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
                  {newsList
                     ? newsList.map((news) => (
                          <TableRow hover key={news._id}>
                             <TableCell align="left">
                                <Box
                                   sx={{
                                      alignItems: 'center',
                                      display: 'flex',
                                   }}
                                >
                                   <Typography
                                      sx={{ fontWeight: 500 }}
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
                             <TableCell align="left">{news.content}</TableCell>
                             <TableCell align="center">
                                <Link href={news.link} style={{ color: 'inherit' }}>
                                   {news.link}
                                </Link>
                             </TableCell>

                             <TableCell align="center">
                                <Stack direction="row">
                                   <Tooltip title="Delete" placement="top">
                                      <IconButton
                                         size="small"
                                         onClick={() => setOpenConfirmDialog(true)}
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
               <Avatar
                  sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}
               >
                  <IconReportProblem />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this new?"
            onSubmit={handleDelete}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </Card>
   );
}
