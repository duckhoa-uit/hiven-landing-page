import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import Loading from '@components/loading/loading';
import MouseFollower from '@components/mouse-follower/mouse-follower';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import { Box } from '@mui/material';
import { fetchCountries, fetchHivenDetails } from '@utils/hivenSlice';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MainLayout({ children }) {
   const hiven = useSelector((x) => x.hiven.data);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         await dispatch(fetchHivenDetails());
         await dispatch(fetchCountries());
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

   return (
      <>
         <Box
            sx={{
               width: hiven?.id ? 0 : '100%',
               height: '100vh',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               opacity: hiven?.id ? 0 : 1,
               transition: 'opacity 0.4s ease, width 0.1s ease 0.5s',

               position: 'fixed',
               top: 0,
               left: 0,
               zIndex: 999,
               backgroundColor: '#f2f4f8',
            }}
         >
            <Loading />
         </Box>
         <Header />
         {children}
         <ScrollToTop />
         {/* {children.type.name !== 'Contact' && <ContactWithUs />} */}
         <Footer />
      </>
   );
}
