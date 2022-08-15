import BreakpointProvider from '@components/common/breakpoint/breakpoint-provider';
import { EmptyLayout } from '@components/layouts/empty-layout';
import { memo, useEffect } from 'react';
import gsap from 'gsap';

import MouseFollower from '@components/mouse-follower/mouse-follower';
import '../scss/main.scss';

// AOS styles
import AOS from 'aos';
import 'aos/dist/aos.css';
// SWIPER styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import Magnetic from '@components/mouse-follower/magnetic';
import { Provider } from 'react-redux';
import store from '@utils/store';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainContext from '@components/common/main-context/main-context';

const MyApp = memo(({ Component, pageProps }) => {
   const Layout = Component.Layout ?? EmptyLayout;

   useEffect(() => {
      AOS.init({
         startEvent: 'DOMContentLoaded',
         duration: 500,
         once: true,
      });

      document.querySelectorAll('[data-magnetic]').forEach(function (el) {
         new Magnetic(el);
      });

      return () => {};
   }, []);

   return (
      <Provider store={store}>
         <BreakpointProvider>
            <MainContext>
               <Layout>
                  <Component {...pageProps} />
               </Layout>
            </MainContext>
         </BreakpointProvider>

         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
         />
      </Provider>
   );
});

MyApp.displayName = 'Hiven';
export default MyApp;
