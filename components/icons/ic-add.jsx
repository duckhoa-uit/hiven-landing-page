import * as React from 'react';

function IconAdd(props) {
   return (
      <svg
         width={24}
         height={24}
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M12 6v12M18 12H6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
         />
      </svg>
   );
}

export default IconAdd;
