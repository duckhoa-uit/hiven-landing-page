import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import IconChevronRight from '@components/icons/ic-chevron-right';
import Hexagon from '@components/common/hexagon';
import heroSliderImage from '../../assets/images/hero-slider-1.png';
import LogoLarge from '@components/icons/logo-large';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const IMAGES = [
   {
      id: 1,
      attributes: {
         url: heroSliderImage,
      },
   },
   {
      id: 2,

      attributes: {
         url: heroSliderImage,
      },
   },
   {
      id: 3,
      attributes: {
         url: heroSliderImage,
      },
   },
   {
      id: 4,
      attributes: {
         url: heroSliderImage,
      },
   },
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
   const hiven = useSelector((x) => x.hiven.data);
   const [content, setContent] = useState('Unlocking Potential In South-east Asia');
   const [images, setImages] = useState(IMAGES);
   useEffect(() => {
      if (hiven?.id) {
         setContent(hiven.attributes.hero_slider?.subtitle);
         setImages(hiven.attributes.hero_slider?.banners?.data);
      }
   }, [hiven?.id]);

   const pagination = {
      el: '.hero-slider__pagination',
      clickable: true,
      renderBullet: function (index, className) {
         return '<a class="' + className + '">0' + (index + 1) + '</a>';
      },
   };
   return (
      <section className="hero-slider__container">
         <div className="hero-slider__hexagon-container">
            <div className="hero-slider__hexagon__inner">
               <div
                  className="hero-slider__hexagon-group hexagon-group"
                  data-aos="zoom-in"
               >
                  <Hexagon className="hex1" />
                  <Hexagon className="hex2" size="s" />
                  <Hexagon className="hex3" size="m" />
               </div>
               <div
                  className="hero-slider__hexagon-group2 hexagon-group2"
                  data-aos="zoom-in"
               >
                  <Hexagon className="hex1" size="s" />
                  <Hexagon className="hex2" size="m" />
               </div>
            </div>
         </div>
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
            {images?.map((img) => (
               <SwiperSlide key={img.id}>
                  <Image src={img.attributes.url} alt="" layout="fill" priority />
               </SwiperSlide>
            ))}
         </Swiper>

         <div className="hero-slider__content">
            <HeroSliderPagination />
            <LogoLarge data-aos="fade-up" data-aos-duration="500" className="logo" />
            <p
               data-aos="fade-up"
               data-aos-anchor=".logo"
               data-aos-duration="500"
               data-aos-delay="100"
               className="subtitle textWrapper"
            >
               {content}
            </p>
            <h1>UNLOCKING POTENTIAL IN SOUTH-EAST ASIA</h1>
         </div>
         <HeroSliderNavigation />
      </section>
   );
}
