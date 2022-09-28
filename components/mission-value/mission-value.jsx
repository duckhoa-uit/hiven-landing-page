import HexagonImage from '@components/hexagon-image/hexagon-image';
import MoreLink from '@components/more-link/more-link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function MissionAndValue() {
   const hiven = useSelector((x) => x.hiven.data);
   const [bannerSource, setbannerSource] = useState('');
   const [title, setTitle] = useState('');

   useEffect(() => {
      if (hiven?.id) {
         setbannerSource(
            hiven.attributes.mission_value?.image.data?.attributes?.formats?.large?.url ||
               ''
         );
         setTitle(hiven.attributes.mission_value?.title || '');
      }
   }, [hiven?.id]);

   return (
      <div className="mission-value__container">
         <div className="container-full">
            <div className="mission-value__inner">
               <HexagonImage source={bannerSource} />
               <div className="mission-value__content">
                  <div className="mission-value__content-title">
                     <h2 className="section-title" data-aos="fade-up">
                        About us
                     </h2>
                     <h3
                        className="section-subtitle color--blue"
                        data-aos="fade-up"
                        data-aos-delay="100"
                     >
                        Mission <br />& Value
                     </h3>
                  </div>
                  <div
                     className="mission-value__content-details"
                     data-aos="fade-up"
                     data-aos-delay="100"
                  >
                     <p
                        className="section-description color--blue-grey"
                        style={{ marginTop: 32, marginBottom: 32 }}
                     >
                        {title}
                     </p>
                     <MoreLink text={'Find Out More'} link="/about-us" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
