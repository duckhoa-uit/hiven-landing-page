import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import IconChevronRight from '@components/icons/ic-chevron-right';
import IconLogo from '@components/icons/logo';

const IMAGES = [
   'https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
   'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
   'https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
   'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
];

const HeroSliderNavigation = () => (
   <div className="hero-slider__navigation">
      <div id="prev-btn" data-cursor-text="Prev">
         <IconChevronRight className="icon" />
      </div>
      <div id="next-btn" data-cursor-text="Next">
         <IconChevronRight className="icon" />
      </div>
   </div>
);

const HeroSliderPagination = () => <div className="hero-slider__pagination" />;

export default function HeroSlider() {
   const pagination = {
      el: '.hero-slider__pagination',
      clickable: true,
      renderBullet: function (index, className) {
         return '<a class="' + className + '">0' + (index + 1) + '</a>';
      },
   };

   return (
      <section className="hero-slider__container">
         <Swiper
            loop
            className="hero-slider"
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            pagination={pagination}
            navigation={{
               nextEl: '#next-btn',
               prevEl: '#prev-btn',
            }}
         >
            {IMAGES.map((img) => (
               <SwiperSlide key={img}>
                  <Image src={img} alt="" layout="fill" />
               </SwiperSlide>
            ))}
         </Swiper>

         <div className="hero-slider__content">
            <HeroSliderPagination />
            <IconLogo
               data-aos="fade-up"
               data-aos-duration="500"
               width={502}
               height={133}
               className="logo"
            />
            <p
               data-aos="fade-up"
               data-aos-anchor=".logo"
               data-aos-duration="500"
               data-aos-delay="100"
               className="subtitle textWrapper"
            >
               Unlock potential in south-east area
            </p>
         </div>
         <HeroSliderNavigation />
      </section>
   );
}
