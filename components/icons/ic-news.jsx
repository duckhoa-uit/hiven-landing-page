import * as React from 'react';

function IconNews(props) {
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
            d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586zM9 8a1 1 0 000 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h4a1 1 0 100-2H9z"
            fill="currentColor"
         />
      </svg>
   );
}

export default IconNews;
