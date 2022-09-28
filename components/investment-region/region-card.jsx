/* eslint-disable react/display-name */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { getCoordinate, getRegionInfo } from './geography-manager';
import Image from 'next/image';
import useBreakpoint from '@components/common/breakpoint/useBreakpoint';
import { useSelector } from 'react-redux';

const RegionCard = memo(({ id, name, containerWidth, containerHeight, isSelected }) => {
   const areas = useSelector((x) => x.hiven.areas);

   const [info, setInfo] = useState(null);
   const { windowWidth } = useBreakpoint();

   useEffect(() => {
      const regionInfo = areas.find((i) => i.id === id) || getRegionInfo(name);
      setInfo(regionInfo);
   }, [id, name, areas]);

   const coordinate = useMemo(() => {
      return getCoordinate(0, 193, containerHeight);
   }, [containerHeight]);

   return (
      <div
         className={`geography-map__card ${isSelected ? 'active' : ''}`}
         style={{
            bottom: `${containerHeight - (coordinate.y + 170)}px`,
            left: `${containerWidth}px`,
            transform: !isSelected ? 'none' : `translateX(-380px)`,
         }}
      >
         <div className="geography-map__card--container">
            <div className="head">
               {info?.image.data && (
                  <Image
                     src={info?.image.data.attributes?.formats?.small?.url}
                     width={380}
                     height={254}
                     alt={name}
                     objectFit="cover"
                  />
               )}
            </div>
            {windowWidth > 444 && (
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
            )}
         </div>
      </div>
   );
});

export default RegionCard;
