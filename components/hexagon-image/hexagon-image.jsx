import IconHexagon from '@components/icons/ic-hexagon';
import React from 'react';

export default function HexagonImage({ source, alt = '' }) {
   return (
      <div className="hexagon-image__container">
         <div
            className="hexagon-image"
            data-source={source}
            style={{ backgroundImage: `url(${source})` }}
            data-aos="zoom-in"
         />
         <div className="hexagon__outer-1">
            <IconHexagon
               data-aos-anchor={`[data-source="${source}"]`}
               data-aos="zoom-in"
               data-aos-delay="100"
            />
         </div>
         <div className="hexagon__outer-2">
            <IconHexagon
               data-aos-anchor={`[data-source="${source}"]`}
               data-aos="zoom-in"
               data-aos-delay="200"
            />
         </div>
      </div>
   );
}
