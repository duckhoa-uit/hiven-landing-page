import IconChevron from '@components/icons/ic-chevron';
import React, { useCallback, useMemo, useState } from 'react';
import { areas } from './geography-manager';
import GeographyMap from './geography-map';

const InvestmentRegion = () => {
   const [selectedRegion, setSelectedRegion] = useState(areas[0]?.name || '');

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

   return (
      <div className="investment-region">
         <div className="investment-region__title" data-aos="fade-up">
            Investment <br />
            <span>Region</span>
         </div>
         <div className="investment-region__content">
            <div className="investment-region__control">
               <h3 className="investment-region__control--title" data-aos="fade-up">
                  Investment <br />
                  Area
               </h3>
               {regions}
            </div>
            <GeographyMap selected={selectedRegion} onChange={handleChangeRegion} />
         </div>
      </div>
   );
};

export default InvestmentRegion;
