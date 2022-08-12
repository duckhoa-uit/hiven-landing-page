import Breakpoint from '@components/common/breakpoint/breakpoint';
import useBreakpoint from '@components/common/breakpoint/useBreakpoint';
import ResizeDetector from '@components/common/resize-detector';
import IconChevron from '@components/icons/ic-chevron';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { areas, getRegionInfo } from './geography-manager';
import GeographyMap from './geography-map';

const InvestmentRegion = () => {
   const { windowWidth } = useBreakpoint();
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

   const getRegionsMb = () => {
      if (windowWidth > 380) {
         return (
            <div className="investment-region__mb-control">
               <div className="investment-region__mb-control-container">{regions}</div>
            </div>
         );
      }
      return (
         <div className="investment-region__xsmall">
            {areas.map((region) => {
               return (
                  <div
                     className={`investment-region__control--item ${
                        selectedRegion === region.name ? 'active' : ''
                     }`}
                     key={region.name}
                     onClick={() => setSelectedRegion(region.name)}
                  >
                     <div className="head">
                        <span>{region.name}</span>
                        <IconChevron />
                     </div>
                     <div className="body">
                        <RegionInfoSmall name={region.name} />
                     </div>
                  </div>
               );
            })}
         </div>
      );
   };

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
            <Breakpoint md down>
               {getRegionsMb()}
            </Breakpoint>
            <ResizeDetector onResize={onResize} />
         </div>
      </div>
   );
};

const RegionInfoSmall = ({ name }) => {
   const [info, setInfo] = useState(null);

   useEffect(() => {
      const regionInfo = getRegionInfo(name);
      setInfo(regionInfo);
   }, [name]);

   return (
      <div className="region-info-small">
         <div className="geography-map__card--container">
            <div className="body">
               <span className="body__no">{info?.no || ''}</span>Regions
            </div>
            <div className="foot">
               <span className="foot__content">
                  Headquarter in <span>{name}</span>
               </span>
               <span className="foot__addr">{info?.address}</span>
            </div>
         </div>
      </div>
   );
};

export default InvestmentRegion;
