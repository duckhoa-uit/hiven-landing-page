import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import IconChevronRight from '@components/icons/ic-chevron-right';
import IconLogo from '@components/icons/logo';
import Hexagon from '@components/common/hexagon';
import heroSliderImage from '../../assets/images/hero-slider-1.png';
import LogoLarge from '@components/icons/logo-large';

const IMAGES = [heroSliderImage, heroSliderImage, heroSliderImage, heroSliderImage];

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
         <div className="hero-slider__hexagon-group hexagon-group" data-aos="zoom-in">
            <Hexagon className="hex1" />
            <Hexagon className="hex2" size="s" />
            <Hexagon className="hex3" size="m" />
         </div>
         <div className="hero-slider__hexagon-group2 hexagon-group2" data-aos="zoom-in">
            <Hexagon className="hex1" size="s" />
            <Hexagon className="hex2" size="m" />
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
            {IMAGES.map((img) => (
               <SwiperSlide key={img}>
                  <Image src={img} alt="" layout="fill" />
                  {/* <div className="blur-hexagons--left">
                     <HexagonBlur size={57} />
                     <HexagonBlur size={300} />
                  </div> */}
                  {/* <div className="hex hex-2">
                     <HexagonBlur size={135} />
                  </div>
                  <div className="hex hex-3">
                     <HexagonBlur size={255} />
                  </div>
                  <div className="hex hex-1">
                     <HexagonBlur size={57} />
                  </div>
                  <div className="hex hex-4">
                     <HexagonBlur size={50} rotate={-45} blur={12} />
                  </div>
                  <div className="hex hex-5">
                     <HexagonBlur size={104} rotate={-45} blur={12} />
                  </div> */}
               </SwiperSlide>
            ))}
         </Swiper>

         <div className="hero-slider__content">
            <HeroSliderPagination />
            <LogoLarge
               data-aos="fade-up"
               data-aos-duration="500"
               className="logo"
            />
            <p
               data-aos="fade-up"
               data-aos-anchor=".logo"
               data-aos-duration="500"
               data-aos-delay="100"
               className="subtitle textWrapper"
            >
               Unlocking Potential In South-east Asia
            </p>
         </div>
         <HeroSliderNavigation />
      </section>
   );
}
