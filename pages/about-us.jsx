import HeroSlider from '@components/hero-slides/hero-slider';
import MainLayout from '@components/layouts/main-layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import HexagonImage from '@components/hexagon-image/hexagon-image';
import MoreLink from '@components/more-link/more-link';
import IconKKFung from '@components/icons/ic-KK-Fund';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';

const AboutUs = () => {
   return (
      <>
         <Head>
            <title>Hiven</title>
            <meta name="description" content="Hiven" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main style={{ height: 'auto' }}>
            <div className="about-us-banner__container">
               <div className="about-us-banner__title">
                  <h2 data-aos="fade-up" data-aos-delay="500">
                     About Us
                  </h2>
               </div>
            </div>
            <div className="about-us-content">
               <div className="about-us-content__container">
                  <div className="title">
                     <pre data-aos="fade-down">Corporate</pre>
                     <p data-aos="fade-up">Profile</p>
                  </div>
               </div>
            </div>

            <div className="about-us-container-full">
               <div className="about-us-group-content">
                  <div className="CJIA" data-aos="fade-up">
                     <div className="CJIA-website"></div>
                     <MoreLink href={'https://cjtrade.net/'} text={'View Website'} />
                  </div>
                  <div className="web-intro" data-aos="fade-up">
                     <p className="intro">
                        CJ International Asia (“CJIA”) was established in 2006 to
                        strengthen purchasing competitiveness of CJ Group, the origin of
                        Samsung Group. CJIA has built up trading foundation by purchasing
                        raw sugar, grains, and the major agricultural commodities for and
                        on behalf of the affiliates of CJ Group. CJIA becomes is one of
                        Asia’s leading agricultural traders, thanks to its extensive
                        experience and skilled workforce. Total sales revenue of CJIA
                        reached USD $5.3B with 12.4M Metric Ton in 2021.
                     </p>
                     <p className="intro">
                        The core competency of CJIA is Marketing and Logistics. It is
                        achieved by optimizing the stable demand of CJ Group. Based on
                        this, CJIA has formed partnership and long-term contracts with
                        supplier to maximize mutual interest and achieve sustainable
                        growth.Meanwhile, CJIA has decided to set up a new investment
                        holdings company to invest in tech start-ups in Southeast Asia.
                        The company is looking for start-ups that have great growth
                        potential and trying to invest in them in the early stage.
                     </p>
                  </div>
               </div>
               <div className="about-us-group-content">
                  <HexagonImage
                     source={
                        'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                     }
                  />
               </div>
               <div className="about-us-group-content">
                  <HexagonImage
                     source={
                        'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
                     }
                  />
               </div>
               <div className="about-us-group-content-final">
                  <div className="KKFung" data-aos="fade-up">
                     <IconKKFung></IconKKFung>
                     <h2 className="KKFung-Title">KK Fund Pte Ltd</h2>
                  </div>
                  <MoreLink
                     href={'https://www.kkfund.co/'}
                     text={'View Website'}
                     data-aos="fade-up"
                     data-aos-anchor=".KKFung"
                  />
                  <div className="web-intro" data-aos="fade-up">
                     <p className="intro">
                        KK Fund is a venture capital investing in early-stage tech
                        startups operating in the mobile and internet technology space in
                        diverse industry sectors including Blockchain, Internet of Things,
                        Entertainment Tech, FinTech, EdTech, HRTech, Mobility and
                        Healthcare Tech, and Prop Tech and primarily based in Southeast
                        Asia, South Korea, Hong Kong and Taiwan.
                     </p>
                     <p className="intro">
                        KK Fund is an early-stage focused venture capital fund founded in
                        2015 by Kuan Hsu and Koichi Saito. They have a track record of
                        several exits and unicorn investment. Supported by successful
                        entrepreneurs, corporates, and family offices, KK Fund backs solid
                        founders early in their entrepreneurial journey and helps them
                        solve fundamental problems in Southeast Asia.
                     </p>
                  </div>
               </div>
            </div>
            <ScrollToTop></ScrollToTop>
         </main>
      </>
   );
};
AboutUs.Layout = MainLayout;

export default AboutUs;
