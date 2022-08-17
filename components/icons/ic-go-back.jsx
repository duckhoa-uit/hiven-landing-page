import * as React from 'react';

function IconGoBack(props) {
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
            d="M5 12l-.707-.707-.707.707.707.707L5 12zm12 1a1 1 0 100-2v2zM8.293 7.293l-4 4 1.414 1.414 4-4-1.414-1.414zm-4 5.414l4 4 1.414-1.414-4-4-1.414 1.414zM5 13h12v-2H5v2z"
            fill="currentColor"
         />
      </svg>
   );
}

export default IconGoBack;
