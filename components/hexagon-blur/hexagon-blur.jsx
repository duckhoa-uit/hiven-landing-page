import React from 'react';

export default function HexagonBlur({ size, rotate = 0, blur = 1.5 }) {
   return (
      <div
         className="hexagon--blur"
         style={{
            transform: `scale(${size / 160}) rotate(${rotate}deg)`,
            backdropFilter: `blur(${blur}px)`,
         }}
      >
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
}
