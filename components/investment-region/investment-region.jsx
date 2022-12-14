import Breakpoint from '@components/common/breakpoint/breakpoint';
import useBreakpoint from '@components/common/breakpoint/useBreakpoint';
import ResizeDetector from '@components/common/resize-detector';
import IconChevron from '@components/icons/ic-chevron';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getRegionInfo, _dummyRegionData } from './geography-manager';
import GeographyMap from './geography-map';
import { useSelector } from 'react-redux';

const InvestmentRegion = () => {
   const { windowWidth } = useBreakpoint();
   const [selectedRegion, setSelectedRegion] = useState('');
   const [containerHeight, setContainerHeight] = useState(0);
   const areas = useSelector((x) => x.hiven.areas);

   useEffect(() => {
      if (areas.length) {
         setSelectedRegion(areas[0]?.name || '');
      }
   }, [areas]);

   // useEffect(() => {
   //    hiven.attributes.investment_region.map((region) => {
   //       _dummyRegionData[region.title].address = region.description;
   //       _dummyRegionData[region.title].imgUrl = region.image?.data.attributes.url;
   //    });
   // }, [hiven?.id]);

   const handleChangeRegion = useCallback((regionName) => {
      if (regionName) setSelectedRegion(regionName);
   }, []);

   const regions = useMemo(() => {
      return (
         <>
            {areas.map((region) => {
               return (
                  <RegionItem
                     isActive={selectedRegion === region.name}
                     key={region.name}
                     setSelectedRegion={setSelectedRegion}
                     {...region}
                  />
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
      if (windowWidth > 444) {
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
                        <RegionInfoSmall id={region.id} />
                     </div>
                  </div>
               );
            })}
         </div>
      );
   };

   const style = {};
   if (windowWidth >= 1366) {
      style.minHeight = containerHeight;
   }

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
               ...style,
            }}
         >
            <div className="investment-region__control">
               <h3 className="investment-region__control--title" data-aos="fade-up">
                  Investment <br />
                  Area
               </h3>
               <div className="investment-region__control--items">
                  <Breakpoint xl up>
                     {regions}
                  </Breakpoint>
               </div>
            </div>
            <GeographyMap selected={selectedRegion} onChange={handleChangeRegion} />
            <Breakpoint lg down>
               {getRegionsMb()}
            </Breakpoint>
            <ResizeDetector onResize={onResize} />
         </div>
      </div>
   );
};

const RegionInfoSmall = ({ id, name }) => {
   const [info, setInfo] = useState(null);
   const areas = useSelector((x) => x.hiven.areas);

   useEffect(() => {
      const regionInfo = areas.find((i) => i.id === id) || getRegionInfo(name);
      setInfo(regionInfo);
   }, [id, name, areas]);

   return (
      <div className="region-info-small">
         <div className="geography-map__card--container info-small">
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

const RegionItem = (props) => {
   const ref = useRef();
   const onClick = () => {
      props.setSelectedRegion(props.name);
      ref.current.scrollIntoView({
         behavior: 'smooth',
         block: 'nearest',
         inline: 'nearest',
      });
   };

   return (
      <div
         ref={ref}
         className={`investment-region__control--item ${props.isActive ? 'active' : ''}`}
         onClick={onClick}
      >
         <span>{props.name}</span>
         <IconChevron />
      </div>
   );
};

export default InvestmentRegion;
