import React, { useMemo } from 'react';

const Hexagon = ({ className, size = 'xxl', ...props }) => {
   const { width, height } = useMemo(() => {
      let width = 311;
      let height = 356;

      if (size === 's') {
         width = 57;
         height = 65;
      }

      if (size === 'm') {
         width = 168;
         height = 193;
      }
      return {
         width,
         height,
      };
   }, [size]);

   const renderPath = () => {
      if (size === 's') {
         return (
            <path
               d="M28.5 63.8487L1 48.1598V16.8217L28.5 1.15097L56 16.8217V48.1598L28.5 63.8487Z"
               stroke="white"
               strokeWidth={2}
            />
         );
      }
      if (size === 'm') {
         return (
            <path
               d="M84 191.847L1 144.143V48.801L84 1.15306L167 48.801V144.143L84 191.847Z"
               stroke="white"
               strokeWidth={2}
            />
         );
      }
      return (
         <path
            d="M155.5 355.424L0.5 266.658V89.2384L155.5 0.576021L310.5 89.2384V266.658L155.5 355.424Z"
            stroke="white"
         />
      );
   };

   return (
      <div
         className={`hexagon ${className}`}
         style={{
            width: width,
            height: height,
         }}
         {...props}
      >
         <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            {renderPath()}
         </svg>
         <div className="hexagon__bg"></div>
      </div>
   );
};

export default Hexagon;
