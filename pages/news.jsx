import AnimatedAppearText from '@components/animated-appear-text/animated-appear-text';
import Hexagon from '@components/common/hexagon';
import MainLayout from '@components/layouts/main-layout';
import NewsCard from '@components/news-card/news-card';
import Head from 'next/head';
import { useEffect } from 'react';

const News = () => {
   useEffect(() => {
      const text = new AnimatedAppearText([['Latest&nbsp']]);
   }, []);

   return (
      <>
         <Head>
            <title>Hiven</title>
            <meta name="description" content="Hiven" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main style={{ height: 'auto' }}>
            <div className="news-banner__container">
               <div
                  className="news-banner__hexagon-group hexagon-group"
                  data-aos="zoom-in"
               >
                  <Hexagon className="hex1" />
                  <Hexagon className="hex2" size="s" />
                  <Hexagon className="hex3" size="m" />
               </div>
               <div
                  className="news-banner__hexagon-group2 hexagon-group2"
                  data-aos="zoom-in"
               >
                  <Hexagon className="hex1" size="s" />
                  <Hexagon className="hex2" size="m" />
               </div>
               <div className="container-full">
                  <div className="news-banner__inner">
                     <div className="news-banner__title">
                        <h2 data-aos="fade-up" data-aos-delay="500">
                           News
                        </h2>
                     </div>
                  </div>
               </div>
            </div>
            <div className="news">
               <div className="container-full">
                  <div className="news__inner">
                     <div className="news__title">
                        <h3>
                           <div className="wordContainer">
                              <div className="word">
                                 <p>Latest</p>
                              </div>
                           </div>
                        </h3>
                     </div>
                     <div className="cards-grid">
                        <NewsCard
                           url="https://www.dealstreetasia.com/stories/cj-international-asia-kk-fund-jv-296381"
                           banner={
                              'https://cdn.dealstreetasia.com/uploads/2022/06/1st-picture-scaled-e1655137376173.jpg'
                           }
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="load-more-post">
               <span data-magnetic>
                  <div className="load-more-post_button">LOAD MORE POST</div>
               </span>
            </div>
         </main>
      </>
   );
};
News.Layout = MainLayout;

export default News;
