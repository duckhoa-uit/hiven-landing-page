import Breakpoint from '@components/common/breakpoint/breakpoint';
import ResizeDetector from '@components/common/resize-detector';
import IconChevron from '@components/icons/ic-chevron';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { areas } from './geography-manager';
import GeographyMap from './geography-map';

const InvestmentRegion = () => {
   const [selectedRegion, setSelectedRegion] = useState('');
   const [containerHeight, setContainerHeight] = useState(0);

   useEffect(() => {
      setSelectedRegion(areas[0]?.name || '');
   }, []);

   const handleChangeRegion = useCallback((regionName) => {
      setSelectedRegion(regionName);
   }, []);

   const regions = useMemo(() => {
      return (
         <>
            {areas.map((region) => {
               return (
                  <div
                     className={`investment-region__control--item ${
                        selectedRegion === region.name ? 'active' : ''
                     }`}
                     key={region.name}
                     onClick={() => setSelectedRegion(region.name)}
                  >
                     <span>{region.name}</span>
                     <IconChevron />
                  </div>
               );
            })}
         </>
      );
   }, [selectedRegion]);

   const onResize = useCallback((w) => {
      let h = (w * 77) / 100;
      if (w <= 1360) {
         h = (w * 70) / 100;
      } else if (w <= 768) {
         h = (w * 120) / 100;
      }
      setContainerHeight(h);
   }, []);

   return (
      <div className="investment-region">
         <div className="investment-region__title" data-aos="fade-up">
            Investment <br />
            <span>Region</span>
         </div>
         <div
            className="investment-region__content"
            style={{
               height: containerHeight,
            }}
         >
            <div className="investment-region__control">
               <h3 className="investment-region__control--title" data-aos="fade-up">
                  Investment <br />
                  Area
               </h3>
               <Breakpoint lg up>
                  {regions}
               </Breakpoint>
            </div>
            <GeographyMap selected={selectedRegion} onChange={handleChangeRegion} />
            <ResizeDetector onResize={onResize} />
         </div>
      </div>
   );
};

export default InvestmentRegion;
