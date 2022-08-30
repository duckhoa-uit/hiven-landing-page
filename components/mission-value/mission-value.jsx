import HexagonImage from '@components/hexagon-image/hexagon-image';
import MoreLink from '@components/more-link/more-link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function MissionAndValue() {
   const hiven = useSelector((x) => x.hiven.data);
   const [bannerSource, setbannerSource] = useState(
      'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
   );
   const [title, setTitle] = useState(
      'Our mission is to find, invest, and help businesses grow. Our goal is to fund start-ups that are building the sustainable businesses of the future. '
   );
   useEffect(() => {
      setbannerSource(hiven.attributes.mission_value?.image.data?.attributes.url);
      setTitle(hiven.attributes.mission_value?.title);
   }, [hiven]);
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
