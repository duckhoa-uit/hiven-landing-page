export const formatDate = (ISOString) => {
   const date = new Date(ISOString);
   const year = date.getFullYear();
   let month = date.getMonth() + 1;
   let dt = date.getDate();

   if (dt < 10) {
      dt = '0' + dt;
   }
   if (month < 10) {
      month = '0' + month;
   }

   return dt + '-' + month + '-' + year;
};

export const markModalOpen = (isOpen) => {
   const bodyModalClassname = 'modal-open';
   if (isOpen) {
      if (!document.body.classList.contains(bodyModalClassname)) {
         document.body.classList.add(bodyModalClassname);
      }
   } else {
      if (document.body.classList.contains(bodyModalClassname)) {
         const pattern = new RegExp('(?:^|\\s)' + bodyModalClassname + '(?:\\s|$)', 'g');
         document.body.className = document.body.className.replace(pattern, '');
      }
   }
};
