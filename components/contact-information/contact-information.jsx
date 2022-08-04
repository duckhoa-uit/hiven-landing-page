import HexagonImage from '@components/hexagon-image/hexagon-image';
import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import React from 'react';

export default function ContactInformation() {
   return (
      <section className="contact-info__container">
         <div className="container-full">
            <div className="contact-info__inner">
               <div className="contact-info__content">
                  <div className="title" data-aos="fade-up">
                     <h2>Contact</h2>
                     <div className="icon">
                        <IconHexagonSmall width={28} height={32} />
                     </div>
                  </div>

                  <div className="contact-info__details">
                     <div className="row" data-aos="fade-up" data-aos-delay="100">
                        <p className="field">Address</p>
                        <div className="detail">
                           20 Cecil Street <br /> #12-03 PLUS <br /> Singapore 049705
                        </div>
                     </div>
                     <div className="row" data-aos="fade-up" data-aos-delay="200">
                        <p className="field">Phone</p>
                        <div className="detail">+65 6645 3838</div>
                     </div>
                     <div className="row" data-aos="fade-up" data-aos-delay="300">
                        <p className="field">Email</p>
                        <div className="detail">info@hiven.com.sg</div>
                     </div>
                  </div>
               </div>

               <HexagonImage
                  source={
                     'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                  }
               />
            </div>
         </div>
      </section>
   );
}
