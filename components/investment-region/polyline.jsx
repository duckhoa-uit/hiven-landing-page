/* eslint-disable react/display-name */
import React, { memo, useEffect, useRef, useMemo } from 'react';
import { getCoordinate } from './geography-manager';

const Polyline = memo(({ x, y, containerHeight, containerWidth }) => {
   const lineRef = useRef();
   const animated = useRef(false);

   const coodinate = getCoordinate(x + 12, y + 12, containerHeight);

   useEffect(() => {
      const startAnimate = () => {
         let offset = 1000;
         let animation;
         const _animate = (polyline, len) => {
            if (!offset) offset = len;
            offset -= 18;
            polyline.style.stroke = 'white';
            polyline.style.strokeDashoffset = offset;
            if (offset <= 0) {
               polyline.style.strokeDashoffset = 0;
               window.cancelAnimationFrame(animation);
            } else {
               animation = window.requestAnimationFrame(() => {
                  _animate(polyline, len);
               });
            }
         };
         const polyline = lineRef.current;
         if (polyline) {
            setTimeout(() => {
               const len = polyline.getTotalLength();
               polyline.style.strokeDashoffset = len;
               polyline.style.strokeDasharray = len + ',' + len;
               _animate(polyline, offset);
            }, 300);
         }
      };

      if (!animated.current) {
         animated.current = true;
         startAnimate();
      }
   }, []);

   const topLineCoor = getCoordinate(510, 192, containerHeight);

   return (
      <svg
         height={containerHeight}
         width={containerWidth}
         className="geography-map__region--polyline"
      >
         <path
            d={`M ${coodinate.x},${coodinate.y} ${topLineCoor.x},${topLineCoor.y} ${coodinate.containerW},${topLineCoor.y}`}
            ref={lineRef}
         />
      </svg>
   );
});

export default Polyline;
