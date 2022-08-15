import Hexagon from '@components/common/hexagon';
import HexagonImage from '@components/hexagon-image/hexagon-image';
import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import IconKKFung from '@components/icons/ic-KK-Fund';
import MainLayout from '@components/layouts/main-layout';
import MoreLink from '@components/more-link/more-link';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import Head from 'next/head';

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
               <div className="about-us-banner__hexagon-container">
                  <div
                     className="about-us-banner__hexagon-group hexagon-group"
                     data-aos="zoom-in"
                  >
                     <Hexagon className="hex1" />
                     <Hexagon className="hex2" size="s" />
                     <Hexagon className="hex3" size="m" />
                  </div>
                  <div
                     className="about-us-banner__hexagon-group2 hexagon-group2"
                     data-aos="zoom-in"
                  >
                     <Hexagon className="hex1" size="s" />
                     <Hexagon className="hex2" size="m" />
                  </div>
               </div>
               <div className="container-full">
                  <div className="about-us-banner__inner">
                     <div className="about-us-banner__title" data-aos="fade-up">
                        <h2>About Us</h2>
                        <div className="icon">
                           <IconHexagonSmall width={28} height={32} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="about-us-content">
               <div className="about-us-content__container">
                  <div className="container-full">
                     <div className="about-us-content__inner">
                        <div className="title">
                           <pre data-aos="fade-down">Corporate</pre>
                           <p data-aos="fade-up">Profile</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="about-us-container-full">
               <div className="about-us-group-content">
                  <div className="CJIA" data-aos="fade-up">
                     <div className="CJIA-website"></div>
                     <a href={'https://cjtrade.net/'} target="_blank" rel="noreferrer">
                        <MoreLink text={'View Website'} />
                     </a>
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
               <div className="about-us-hexagon-container">
                  <HexagonImage source={'/about-us-1.svg'} />
               </div>
               <div className="about-us-hexagon-container">
                  <HexagonImage source={'/black.svg'} />
               </div>
               <div className="about-us-group-content-final">
                  <div className="KKFung" data-aos="fade-up">
                     <IconKKFung></IconKKFung>
                     <h2 className="KKFung-Title">KK Fund Pte Ltd</h2>
                  </div>
                  <a href={'https://www.kkfund.co/'} target="_blank" rel="noreferrer">
                     <MoreLink
                        text={'View Website'}
                        data-aos="fade-up"
                        data-aos-anchor=".KKFung"
                     />
                  </a>
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
