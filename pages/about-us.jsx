import Hexagon from '@components/common/hexagon';
import HexagonImage from '@components/hexagon-image/hexagon-image';
import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import MainLayout from '@components/layouts/main-layout';
import MoreLink from '@components/more-link/more-link';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import background from '../public/images/about-us-banner.png';

const AboutUs = () => {
   const hiven = useSelector((x) => x.hiven.data);
   const [bannerSource, setbannerSource] = useState(background.src);

   const [url, setUrl] = useState('https://cjtrade.net/');
   const [description, setDescription] = useState('+65 6645 3838');
   const [nextDescription, setNextDescription] = useState('+65 6645 3838');
   const [logo, setLogo] = useState('/CJIA-logo.svg');
   const [image, setImage] = useState('/about-us-1.svg');

   const [url2, setUrl2] = useState('https://www.kkfund.co/');
   const [description2, setDescription2] = useState('+65 6645 3838');
   const [nextDescription2, setNextDescription2] = useState('+65 6645 3838');
   const [logo2, setLogo2] = useState('/KKFund-logo.svg');
   const [image2, setImage2] = useState('/black.svg');

   var ld;
   var lnd;
   useEffect(() => {
      if(hiven.attributes.about_us_banner.data?.attributes.url) setbannerSource(hiven.attributes.about_us_banner.data?.attributes.url);

      if (hiven?.id) {
         const formData = hiven.attributes.corporate_profile
            ? hiven.attributes.corporate_profile.map((content) => ({
                  url: content.url,
                  description: content.description,
                  nextDescription: content.description,
                  logo: content.logo.data.attributes.url,
                  image: content.image.data.attributes.url,
            }))
            : [];

         if(formData[0].url) setUrl(formData[0].url);
         if(formData[1].url) setUrl2(formData[1].url);
      
         if(formData[0].description.split(/\n/g)[0]) setDescription(formData[0].description.split(/\n/g)[0]);
         if(formData[1].description.split(/\n/g)[0]) setDescription2(formData[1].description.split(/\n/g)[0]);
         
         if(formData[0].description.split(/\n/g)[1]) setNextDescription(formData[0].description.split(/\n/g)[1]);
         if(formData[1].nextDescription.split(/\n/g)[1]) setNextDescription2(formData[1].nextDescription.split(/\n/g)[1]);

         if(formData[0].logo) setLogo(formData[0].logo);
         if(formData[1].logo) setLogo2(formData[1].logo);

         if(formData[0].image) setImage(formData[0].image);
         if(formData[1].image) setImage2(formData[1].image);
      }
   }, [hiven]);
   return (
      <>
         <Head>
            <title>Hiven</title>
            <meta name="description" content="Hiven" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main style={{ height: 'auto' }}>
            <div
               className="about-us-banner__container"
               style={{ backgroundImage: `url(${bannerSource})` }}
            >
               <div className="about-us-banner__hexagon-container">
                  <div className="about-us-banner__hexagon__inner">
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
                     <div className="CJIA-website"
                     style={{ backgroundImage: `url(${image})` }}
                     ></div>
                     <a href={url} target="_blank" rel="noreferrer">
                        <MoreLink text={'View Website'} />
                     </a>
                  </div>
                  <div className="web-intro" data-aos="fade-up">
                     <p className="intro">
                        {description}
                     </p>
                     <p className="intro">
                        {nextDescription}
                     </p>
                  </div>
               </div>
               <div className="about-us-hexagon-container">
                  <HexagonImage source={logo} />
               </div>
               <div className="about-us-hexagon-container">
                  <HexagonImage source={logo2} />
               </div>
               <div className="about-us-group-content-final">
                  <div className="KKFung" data-aos="fade-up">
                     <div className="KKFund-website"
                        style={{ width: 66, height:65, backgroundImage: `url(${image2})`, backgroundSize:"cover", backgroundPosition: "center"}}
                     ></div>
                     <h2 className="KKFung-Title">KK Fund Pte Ltd</h2>
                  </div>
                  <a href={url2} target="_blank" rel="noreferrer">
                     <MoreLink
                        text={'View Website'}
                        data-aos="fade-up"
                        data-aos-anchor=".KKFung"
                     />
                  </a>
                  <div className="web-intro" data-aos="fade-up">
                     <p className="intro">
                        {description2}
                     </p>
                     <p className="intro">
                        {nextDescription2}
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
