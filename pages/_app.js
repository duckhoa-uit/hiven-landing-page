import BreakpointProvider from '@components/common/breakpoint/breakpoint-provider';
import { EmptyLayout } from '@components/layouts/empty-layout';
import { memo, useEffect } from 'react';

import '../scss/main.scss';

// AOS styles
import AOS from 'aos';
import 'aos/dist/aos.css';
// SWIPER styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import Magnetic from '@components/mouse-follower/magnetic';
import store from '@utils/store';
import { Provider } from 'react-redux';

// Toastify
import axiosClient from '@components/api-client/axios-client';
import MainContext from '@components/common/main-context/main-context';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

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
      <>
         <Head>
            <title>Unlocking Potential in South-East Asia</title>
         </Head>
         <SWRConfig
            value={{
               fetcher: (url) => axiosClient.get(url).then((res) => res),
               shouldRetryOnError: false,
            }}
         >
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
                  newestOnTop
                  draggable={false}
                  pauseOnVisibilityChange
                  closeOnClick
                  pauseOnHover
               />
            </Provider>
         </SWRConfig>
      </>
   );
});

MyApp.displayName = 'Hiven';
export default MyApp;
