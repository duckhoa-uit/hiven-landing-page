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

   // if (!hiven?.id) {
   //    return (
   //       <Box
   //          sx={{
   //             width: '100%',
   //             height: 300,
   //             display: 'flex',
   //             alignItems: 'center',
   //             justifyContent: 'center',
   //          }}
   //       >
   //          <CircularProgress />
   //       </Box>
   //    );
   // }

   return (
      <>
         <Header />
         {children}
         <ScrollToTop />
         {children.type.name !== 'Contact' && <ContactWithUs />}
         <Footer />
      </>
   );
}
