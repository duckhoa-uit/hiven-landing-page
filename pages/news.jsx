import MainLayout from '@components/layouts/main-layout';
import NewsCard from '@components/news-card/news-card';
import Head from 'next/head';

const News = () => {
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
                     News
                  </h2>
               </div>
            </div>
            <div className="news">
               <div className="container-full">
                  <div className="news__inner">
                     <div className="news__title">
                        <h3 data-aos="fade-down" data-aos-delay="500">
                           Latest
                        </h3>
                     </div>
                     <div className="cards-grid">
                        <NewsCard
                           url="https://www.dealstreetasia.com/stories/cj-international-asia-kk-fund-jv-296381"
                           banner={
                              'https://cdn.dealstreetasia.com/uploads/2022/06/1st-picture-scaled-e1655137376173.jpg'
                           }
                        />
                        {/* <NewsCard className=" up"></NewsCard>
                        <NewsCard></NewsCard>
                        <NewsCard className=" up"></NewsCard> */}
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
