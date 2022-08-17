import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import ContactWithUs from '@components/contact-with-us/contact-with-us';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import Contact from 'pages/contact';
import MouseFollower from '@components/mouse-follower/mouse-follower';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { fetchHivenDetails, fetchHivenNews } from '@utils/hivenSlice';
import Loading from '@components/loading/loading';
import Head from 'next/head';

export default function MainLayout({ children }) {
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         await dispatch(fetchHivenDetails());
         await dispatch(fetchHivenNews());
      })();

      const userAgent = navigator.userAgent.toLowerCase();

      const isMobile = /iPhone|Android/i.test(navigator.userAgent);
      const isTablet =
         /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
            userAgent
         );

      if (isMobile || isTablet) return;

      MouseFollower.registerGSAP(gsap);
      const cursor = new MouseFollower({});

      return () => {
         cursor.destroy();
      };
   }, []);

   if (!hiven?.id) {
      return (
         <>
            <Head>
               <title>Hiven</title>
            </Head>
            <Box
               sx={{
                  width: '100%',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.4s ease',
               }}
            >
               <Loading />
            </Box>
         </>
      );
   }

   return (
      <>
         <Box
            sx={{
               width: '100%',
               height: '100vh',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               opacity: hiven?.id ? 0 : 1,
               display: hiven?.id ? 'none' : 'block',
               transition: 'opacity 0.4s ease',
            }}
         >
            <Loading />
         </Box>
         <Header />
         {children}
         <ScrollToTop />
         {children.type.name !== 'Contact' && <ContactWithUs />}
         <Footer />
      </>
   );
}
