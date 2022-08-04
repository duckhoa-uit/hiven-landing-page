import Image from 'next/image';
import React from 'react';

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
                     src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                     number="01"
                     title="Food Tech"
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                     number="02"
                     title="Agri Tech"
                     data-aos="fade-right"
                  />
                  <BusinessAreaImage
                     src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                     number="03"
                     title="Bio Tech"
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80"
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
