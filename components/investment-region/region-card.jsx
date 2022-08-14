/* eslint-disable react/display-name */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { getCoordinate, getRegionInfo } from './geography-manager';
import Image from 'next/image';
import useBreakpoint from '@components/common/breakpoint/useBreakpoint';

const RegionCard = memo(({ name, containerWidth, containerHeight, isSelected }) => {
   const [info, setInfo] = useState(null);
   const { windowWidth } = useBreakpoint();

   useEffect(() => {
      const regionInfo = getRegionInfo(name);
      setInfo(regionInfo);
   }, [name]);

   const coodinate = useMemo(() => {
      return getCoordinate(0, 193, containerHeight);
   }, [containerHeight]);

   return (
      <div
         className={`geography-map__card ${isSelected ? 'active' : ''}`}
         style={{
            bottom: `${containerHeight - (coodinate.y + 170)}px`,
            left: `${containerWidth}px`,
            transform: !isSelected ? 'none' : `translateX(-380px)`,
         }}
      >
         <div className="geography-map__card--container">
            <div className="head">
               {info?.imgUrl && <Image src={info.imgUrl} alt={name} />}
            </div>
            {
               windowWidth > 444 &&
               <>
                  <div className="body">
                     <span className="body__no">{info?.no || ''}</span>Regions
                  </div>
                  <div className="linebreak"></div>
                  <div className="foot">
                     <div className="foot__content">
                        Headquarter <br />
                        in <span>{name}</span>
                     </div>
                     <span className="foot__addr">{info?.address}</span>
                  </div>
               </>
            }
         </div>
      </div>
   );
});

export default RegionCard;
