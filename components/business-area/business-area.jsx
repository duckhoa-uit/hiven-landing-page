import Image from 'next/image';
import React from 'react';
import img1 from '../../assets/images/business-area-1.png';
import img2 from '../../assets/images/business-area-2.png';
import img3 from '../../assets/images/business-area-3.png';
import img4 from '../../assets/images/business-area-4.png';

const BusinessAreaImage = ({ src, number, title, ...rest }) => (
   <div className="business-area__image" {...rest}>
      <div className="business-area__image-container">
         <Image src={src} alt="" layout="fill" />
         <div className="business-area__image-content">
            <p className="counter">{number}</p>
            <p className="title">{title}</p>
         </div>
      </div>
   </div>
);

export default function BusinessArea() {
   return (
      <section className="business-area__container" data-cursor="-inverse">
         <div className="business-area__content">
            <h3 className="section-title" data-aos="fade-up">
               Portfolio
            </h3>
            <div className="divider" />

            <div className="color--light" style={{ width: 405 }}>
               <h4 className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                  Business Area
               </h4>
               <p
                  className="section-description"
                  style={{ marginTop: 32 }}
                  data-aos="fade-up"
                  data-aos-delay="200"
               >
                  We are an early-stage, Southeast Asia focused venture capital, covering
                  Agri Tech, Food Tech, Bio Tech, Media & Entertainment, Mobility, Fin
                  Tech, etc.
               </p>
            </div>
         </div>

         <div className="container-full">
            <div className="business-area__images">
               <div className="business-area__images--grid">
                  <BusinessAreaImage
                     src={img1}
                     number="01"
                     title="Food Tech"
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src={img2}
                     number="02"
                     title="Agri Tech"
                     data-aos="fade-right"
                  />
                  <BusinessAreaImage
                     src={img3}
                     number="03"
                     title="Bio Tech"
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src={img4}
                     number="04"
                     title="Media & Entertainment, Mobility, Fin Tech, etc"
                     data-aos="fade-right"
                  />
               </div>
            </div>
         </div>
      </section>
   );
}
