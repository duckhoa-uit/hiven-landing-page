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

      // if (size === 'xs') {
      //    width = 26;
      //    height = 30;
      // }


      // // mb
      // if (size === 'l-mb') {
      //    width = 142;
      //    height = 162;
      // }
      // if (size === 'm-mb') {
      //    width = 76;
      //    height = 88;
      // }

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
      // if (size === 'xs') {
      //    return (
      //       <path
      //          d="M13.0883 28.9961L0.653392 21.8969V7.7178L13.0883 0.626902L25.5233 7.7178V21.8969L13.0883 28.9961Z"
      //          stroke="white"
      //          strokeWidth="1.07241"
      //       />
      //    );
      // }
      // if (size === 'l-mb') {
      //    return (
      //       <path
      //          d="M70.7724 161.829L0.268102 121.425V40.6664L70.7724 0.308917L141.277 40.6664V121.425L70.7724 161.829Z"
      //          stroke="white"
      //          strokeWidth="0.536204"
      //       />
      //    );
      // }
      // if (size === 'm-mb') {
      //    return (
      //       <path
      //          d="M38.5432 87.2821L0.848704 65.6026V22.2728L38.5432 0.618385L76.2378 22.2728V65.6026L38.5432 87.2821Z"
      //          stroke="white"
      //          strokeWidth="1.07241"
      //       />
      //    );
      // }
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
