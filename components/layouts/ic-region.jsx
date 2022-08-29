import * as React from 'react';

function IconRegion(props) {
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
            d="M12.398 17.804C13.881 17.034 19 14.016 19 9A7 7 0 105 9c0 5.016 5.119 8.035 6.602 8.804a.855.855 0 00.796 0zM12 12a3 3 0 100-6 3 3 0 000 6z"
            fill="currentColor"
         />
         <path
            d="M18.062 16.5c.615.456.938.973.938 1.5s-.323 1.044-.938 1.5c-.614.456-1.498.835-2.562 1.098-1.064.263-2.271.402-3.5.402s-2.436-.139-3.5-.402-1.948-.642-2.562-1.098C5.323 19.044 5 18.527 5 18s.323-1.044.938-1.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
         />
      </svg>
   );
}

export default IconRegion;
