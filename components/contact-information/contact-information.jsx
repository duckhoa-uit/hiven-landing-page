import HexagonImage from '@components/hexagon-image/hexagon-image';
import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ContactInformation() {
   const hiven = useSelector((x) => x.hiven.data);
   const [bannerSource, setbannerSource] = useState('/contact-banner.svg');
   const [address, setAddress] = useState(
      `20 Cecil Street <br /> #12-03 PLUS <br /> Singapore 049705`
   );
   const [phone, setPhone] = useState('+65 6645 3838');
   const [email, setEmail] = useState('info@hiven.com.sg');

   useEffect(() => {
      if (hiven?.id) {
         setbannerSource(hiven.attributes.contact_banner.data?.attributes.url);

         setAddress(hiven.attributes.contact_address.replace(/\n/g, "<br />"));
         setPhone(hiven.attributes.contact_phone);
         setEmail(hiven.attributes.contact_email);
      }
   }, [hiven?.id]);
   
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
                     <div>Address </div>
                     <div dangerouslySetInnerHTML={{ __html: address }} />
                     <div>Phone</div>
                     <div>{phone}</div>
                     <div>Email</div>
                     <div>{email}</div>
                  </div>
               </div>

               <HexagonImage source={bannerSource} />
            </div>
         </div>
      </section>
   );
}
