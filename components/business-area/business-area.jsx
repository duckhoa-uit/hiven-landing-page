import MoreLink from '@components/more-link/more-link';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import img1 from '../../assets/images/business-area-1.png';
import img2 from '../../assets/images/business-area-2.png';
import img3 from '../../assets/images/business-area-3.png';
import img4 from '../../assets/images/business-area-4.png';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const defaultValues = {
   contentBusiness:
      'We are an early-stage, Southeast Asia focused venture capital, covering Agri Tech, Food Tech, Bio Tech, Media & Entertainment, Mobility, Fin Tech, etc.',
   imagesBusiness: [
      {
         image: '/images/business-area-1.png',
         title: 'Food Tech',
      },
      {
         image: '/images/business-area-2.png',
         title: 'Agri Tech',
      },
      {
         image: '/images/business-area-3.png',
         title: 'Bio Tech',
      },
      {
         image: '/images/business-area-4.png',
         title: 'Media & Entertainment, Mobility, Fin Tech, etcMedia & Entertainment, Mobility, Fin Tech, etc',
      },
   ],
};
const BusinessAreaImage = ({ src, number, title, ...rest }) => (
   <div className="business-area__image" {...rest}>
      <div className="business-area__image-container">
         <Image src={src} alt={`Business area image ${number}`} layout="fill" priority />
         <div className="business-area__image-content">
            <p className="counter">{number}</p>
            <p className="title">{title}</p>
         </div>
      </div>
   </div>
);

const BusinessSliderPagination = () => <div className="business-slider__pagination" />;

export default function BusinessArea() {
   const [businessAreaInfo, setBusinessAreaInfo] = useState(defaultValues);
   const hiven = useSelector((x) => x.hiven.data);

   useEffect(() => {
      if (hiven?.id) {
         const formData = hiven.attributes.business_area_images
            ? hiven.attributes.business_area_images.map((image) => ({
                 image: image.image.data.attributes.url,
                 title: image.title,
              }))
            : [];

         setBusinessAreaInfo({
            contentBusiness: hiven.attributes.business_area_content,
            imagesBusiness: formData,
         });
      }
   }, [hiven?.id]);
   const pagination = {
      el: '.business-slider__pagination',
      clickable: true,
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + '</span>';
      },
   };
   return (
      <section className="business-area__container" data-cursor="-inverse">
         <div className="business-area__content">
            <h2 className="section-title" data-aos="fade-up">
               Poftoflio
            </h2>
            <div className="divider" />

            <div className="color--light" style={{ width: 405 }}>
               <h3 className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                  Business Area
               </h3>
               <p
                  className="section-description"
                  style={{ marginTop: 32 }}
                  data-aos="fade-up"
                  data-aos-delay="200"
               >
                  {businessAreaInfo.contentBusiness}
               </p>
            </div>
         </div>

         <div className="container-full">
            <div className="business-area__images">
               <div className="business-area__images--grid">
                  <BusinessAreaImage
                     src={businessAreaInfo.imagesBusiness[0].image}
                     number="01"
                     title={businessAreaInfo.imagesBusiness[0].title}
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src={businessAreaInfo.imagesBusiness[1].image}
                     number="02"
                     title={businessAreaInfo.imagesBusiness[1].title}
                     data-aos="fade-right"
                  />
                  <BusinessAreaImage
                     src={businessAreaInfo.imagesBusiness[2].image}
                     number="03"
                     title={businessAreaInfo.imagesBusiness[2].title}
                     data-aos="fade-left"
                  />
                  <BusinessAreaImage
                     src={businessAreaInfo.imagesBusiness[3].image}
                     number="04"
                     title={businessAreaInfo.imagesBusiness[3].title}
                     data-aos="fade-right"
                  />
               </div>
            </div>

            <Swiper
               loop
               slidesPerView={'auto'}
               pagination={
                  // clickable: true,
                  pagination
               }
               spaceBetween={30}
               modules={[Pagination]}
               className="mySwiper"
            >
               <SwiperSlide>
                  <BusinessAreaImage
                     src={img1}
                     number="01"
                     title="Food Tech"
                     data-aos="fade-left"
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <BusinessAreaImage
                     src={img2}
                     number="02"
                     title="Agri Tech"
                     data-aos="fade-right"
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <BusinessAreaImage
                     src={img3}
                     number="03"
                     title="Bio Tech"
                     data-aos="fade-left"
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <BusinessAreaImage
                     src={img4}
                     number="04"
                     title="Media & Entertainment, Mobility, Fin Tech, etc"
                     data-aos="fade-right"
                  />
               </SwiperSlide>
            </Swiper>
            <BusinessSliderPagination />

            <div className="more-link-wrapper">
               <MoreLink text={'Find Out More'} link="/about-us" />
            </div>
         </div>
      </section>
   );
}
