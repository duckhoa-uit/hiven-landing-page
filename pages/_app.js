import { memo, useEffect } from 'react';
import gsap from 'gsap';

import MouseFollower from '@components/mouse-follower/mouse-follower';
import { EmptyLayout } from '@components/layouts/empty-layout';
import '../scss/main.scss';

// AOS styles
import AOS from 'aos';
import 'aos/dist/aos.css';
// SWIPER styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Magnetic from '@components/mouse-follower/magnetic';

const MyApp = memo(({ Component, pageProps }) => {
   const Layout = Component.Layout ?? EmptyLayout;

   useEffect(() => {
      AOS.init({
         startEvent: 'DOMContentLoaded',
      });

      MouseFollower.registerGSAP(gsap);
      const cursor = new MouseFollower({
         // className: 'cb-cursor',
         // innerClassName: 'cb-cursor-inner',
         // textClassName: 'cb-cursor-text',
         // mediaClassName: 'cb-cursor-media',
         // mediaBoxClassName: 'cb-cursor-media-box',
         // iconSvgClassName: 'cb-svgsprite',
      });

      document.querySelectorAll('[data-magnetic]').forEach(function (el) {
         new Magnetic(el);
      });

      return () => {
         cursor.destroy();
      };
   }, []);

   return (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   );
});

MyApp.displayName = 'Hiven';
export default MyApp;
