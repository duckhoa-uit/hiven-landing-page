import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@mui/material';

export function ConfirmDialog(props) {
   const { icon, isOpen, title, body, onSubmit, onClose } = props;

   const handleClose = () => {
      if (onClose) onClose();
   };
   const handleSubmit = () => {
      if (onSubmit) onSubmit();
   };

   return (
      <Dialog open={isOpen} onClose={handleClose}>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && <Box sx={{ ml: 2 }}>{icon}</Box>}
            <Box sx={{ flex: 1 }}>
               <DialogTitle>{title}</DialogTitle>
               <DialogContent>
                  <DialogContentText color={'primary'}>{body}</DialogContentText>
               </DialogContent>
            </Box>
         </Box>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" autoFocus>
               Confirm
            </Button>
         </DialogActions>
      </Dialog>
   );
}
