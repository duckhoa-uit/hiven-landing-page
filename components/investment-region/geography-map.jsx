/* eslint-disable react/display-name */
import useBreakpoint from '@components/common/breakpoint/useBreakpoint';
import ResizeDetector from '@components/common/resize-detector';
import React, { useCallback, useMemo, useState, memo, Fragment } from 'react';
import { areas, getCoordinate } from './geography-manager';
import MapGraph from './map-graph';
import Polyline from './polyline';
import RegionCard from './region-card';

const GeographyMap = (props) => {
   const { selected, onChange } = props;
   const [containerSize, setContainerSize] = useState({
      w: 0,
      h: 0,
   });

   const onResize = useCallback((w, h) => {
      setContainerSize({
         w,
         h,
      });
   }, []);

   return (
      <div className="geography-map">
         <div className="geography-map__container">
            {areas.map((region) => {
               return (
                  <RegionCard
                     key={region.name}
                     {...region}
                     containerWidth={containerSize.w}
                     containerHeight={containerSize.h}
                     isSelected={selected === region.name}
                  />
               );
            })}
            <div className="geography-map__region-list">
               {areas.map((region) => {
                  return (
                     <Region
                        key={region.name}
                        {...region}
                        containerWidth={containerSize.w}
                        containerHeight={containerSize.h}
                        isSelected={selected === region.name}
                        onClick={onChange}
                     />
                  );
               })}
            </div>
            <div
               className="geography-map__graph"
               style={{
                  width: containerSize.w,
                  height: containerSize.h,
               }}
               data-aos="zoom-in"
               data-aos-delay="300"
            >
               <MapGraph height={containerSize.h} />
            </div>
            <ResizeDetector onResize={onResize} />
         </div>
      </div>
   );
};

const Region = ({ name, x, y, containerWidth, containerHeight, isSelected, onClick }) => {
   const { windowWidth } = useBreakpoint();
   const coodinate = useMemo(() => {
      return getCoordinate(x, y, containerHeight);
   }, [x, y, containerHeight]);

   return (
      <>
         <div
            className={`geography-map__region ${isSelected ? 'active' : ''}`}
            style={{
               left: coodinate.x,
               top: coodinate.y,
            }}
         >
            <div
               className="geography-map__region--node"
               onClick={() => onClick(name)}
            ></div>
         </div>
         {isSelected && (
            <Polyline
               x={x}
               y={y}
               containerWidth={containerWidth}
               containerHeight={containerHeight}
            />
         )}
         <div
            className={`geography-map__region mask ${isSelected ? 'active' : ''}`}
            style={{
               left: coodinate.x,
               top: coodinate.y,
            }}
         >
            <div
               style={{
                  width: windowWidth > 768 ? 25 : 16,
                  height: windowWidth > 768 ? 25 : 16,
               }}
            ></div>
            <div className="geography-map__region--highlight-circle"></div>
         </div>
      </>
   );
};

export default GeographyMap;
