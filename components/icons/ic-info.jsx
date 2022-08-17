import * as React from 'react';

function IconInfo(props) {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-8-4a1 1 0 11-2 0 1 1 0 012 0zm0 9v-6h-2v6h2z"
            fill="currentColor"
         />
      </svg>
   );
}

export default IconInfo;
