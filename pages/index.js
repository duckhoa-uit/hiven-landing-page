import BusinessArea from '@components/business-area/business-area';
import ContactWithUs from '@components/contact-with-us/contact-with-us';
import HeroSlider from '@components/hero-slides/hero-slider';
// import InvestmentRegion from '@components/investment-region/investment-region';
import MainLayout from '@components/layouts/main-layout';
import MissionAndValue from '@components/mission-value/mission-value';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const InvestmentRegion = dynamic(
   () => import('@components/investment-region/investment-region'),
   {
      suspense: true,
   }
);
const Home = () => {
   return (
      <>
         <HeroSlider />
         <MissionAndValue />
         <BusinessArea />
         <Suspense fallback={`Loading...`}>
            <InvestmentRegion />
         </Suspense>
         <ContactWithUs />
      </>
   );
};
Home.Layout = MainLayout;

export default Home;
