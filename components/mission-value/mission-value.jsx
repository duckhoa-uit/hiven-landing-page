import HexagonImage from '@components/hexagon-image/hexagon-image';
import MoreLink from '@components/more-link/more-link';
import React from 'react';

export default function MissionAndValue() {
   return (
      <div className="mission-value__container">
         <div className="container-full">
            <div className="mission-value__inner">
               <HexagonImage
                  source={
                     'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                  }
               />
               <div className="mission-value__content">
                  <div className="mission-value__content-title">
                     <h3 className="section-title" data-aos="fade-up">
                        About us
                     </h3>
                     <h4
                        className="section-subtitle color--blue"
                        data-aos="fade-up"
                        data-aos-delay="100"
                     >
                        Mission & Value
                     </h4>
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
                        Our mission is to find, invest, and help businesses grow. Our goal
                        is to fund start-ups that are building the sustainable businesses
                        of the future.
                     </p>
                     <MoreLink text={'Find Out More'} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
