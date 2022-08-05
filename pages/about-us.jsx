import HeroSlider from '@components/hero-slides/hero-slider';
import MainLayout from '@components/layouts/main-layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import HexagonImage from '@components/hexagon-image/hexagon-image';
import MoreLink from '@components/more-link/more-link';
import IconKKFung from '@components/icons/ic-KK-Fund';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import img1 from '../assets/images/about-us-1.png';
import img2 from '../assets/images/about-us-2.svg';

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
               <div className="container-full">
                  <svg
                     width={336}
                     height={310}
                     viewBox="0 0 336 310"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <g filter="url(#filter0_b_355_8528)">
                        <path
                           d="M192.676 40.959v81.966l71.299 41.006 71.298-41.006V40.959L263.975 0l-71.299 40.959z"
                           fill="#fff"
                           fillOpacity={0.05}
                        />
                        <path
                           d="M263.975 162.778l-70.299-40.432V41.538l70.299-40.385 70.298 40.385v80.808l-70.298 40.432z"
                           stroke="#fff"
                           strokeWidth={2}
                        />
                     </g>
                     <g filter="url(#filter1_b_355_8528)">
                        <path
                           d="M0 82.346v151.191l131.988 75.639 131.987-75.639V82.347L131.988 6.794 0 82.346z"
                           fill="#fff"
                           fillOpacity={0.17}
                        />
                        <path
                           d="M131.988 308.6L.5 233.247V82.637L131.988 7.37l131.487 75.265v150.611L131.988 308.6z"
                           stroke="#fff"
                        />
                     </g>
                     <g opacity={0.5} filter="url(#filter2_b_355_8528)">
                        <path
                           d="M168.062 108.926v27.605l24.191 13.81 24.191-13.81v-27.605l-24.191-13.795-24.191 13.795z"
                           fill="#fff"
                           fillOpacity={0.05}
                        />
                        <path
                           d="M192.253 149.19l-23.191-13.24v-26.443l23.191-13.225 23.191 13.225v26.443l-23.191 13.24z"
                           stroke="#fff"
                           strokeWidth={2}
                        />
                     </g>
                     <defs>
                        <filter
                           id="filter0_b_355_8528"
                           x={184.676}
                           y={-8}
                           width={158.598}
                           height={179.931}
                           filterUnits="userSpaceOnUse"
                           colorInterpolationFilters="sRGB"
                        >
                           <feFlood floodOpacity={0} result="BackgroundImageFix" />
                           <feGaussianBlur in="BackgroundImage" stdDeviation={4} />
                           <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_355_8528"
                           />
                           <feBlend
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_355_8528"
                              result="shape"
                           />
                        </filter>
                        <filter
                           id="filter1_b_355_8528"
                           x={-8}
                           y={-1.20496}
                           width={279.977}
                           height={318.381}
                           filterUnits="userSpaceOnUse"
                           colorInterpolationFilters="sRGB"
                        >
                           <feFlood floodOpacity={0} result="BackgroundImageFix" />
                           <feGaussianBlur in="BackgroundImage" stdDeviation={4} />
                           <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_355_8528"
                           />
                           <feBlend
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_355_8528"
                              result="shape"
                           />
                        </filter>
                        <filter
                           id="filter2_b_355_8528"
                           x={160.062}
                           y={87.1311}
                           width={64.3828}
                           height={71.21}
                           filterUnits="userSpaceOnUse"
                           colorInterpolationFilters="sRGB"
                        >
                           <feFlood floodOpacity={0} result="BackgroundImageFix" />
                           <feGaussianBlur in="BackgroundImage" stdDeviation={4} />
                           <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_355_8528"
                           />
                           <feBlend
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_355_8528"
                              result="shape"
                           />
                        </filter>
                     </defs>
                  </svg>
                  <div className="about-us-banner__inner">
                     <div className="about-us-banner__title">
                        <h2 data-aos="fade-up">About Us</h2>
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
