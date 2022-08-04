import BusinessArea from '@components/business-area/business-area';
import HeroSlider from '@components/hero-slides/hero-slider';
import InvestmentRegion from '@components/investment-region/investment-region';
import MainLayout from '@components/layouts/main-layout';
import MissionAndValue from '@components/mission-value/mission-value';
import Head from 'next/head';

const Home = () => {
   return (
      <>
         <Head>
            <title>Hiven</title>
            <meta name="description" content="Hiven" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <HeroSlider />
         <MissionAndValue />
         <BusinessArea />
         <InvestmentRegion />
      </>
   );
};
Home.Layout = MainLayout;

export default Home;
