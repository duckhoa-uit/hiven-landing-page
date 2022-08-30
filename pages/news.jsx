import AnimatedAppearText from '@components/animated-appear-text/animated-appear-text';
import Hexagon from '@components/common/hexagon';
import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import MainLayout from '@components/layouts/main-layout';
import NewsCard, { NewsCardSkeleton } from '@components/news-card/news-card';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import background from '../public/images/news-banner.png';
import useSWR from 'swr';
import ContactWithUs from '@components/contact-with-us/contact-with-us';

const News = () => {
   const hiven = useSelector((x) => x.hiven.data);
   const [bannerSource, setBannerSource] = useState(background.src);
   const [news, setNews] = useState([]);
   const [loading, setLoading] = useState(false);

   const [pagination, setPagination] = useState({
      page: 1,
      pageSize: 4,
   });

   const { data: response } = useSWR(
      `/news?populate=*&pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`,
      {
         revalidateOnFocus: false,
      }
   );

   useEffect(() => {
      if (response) {
         setNews([...news, ...response.data]);
         setLoading(false);
      } else {
         setLoading(true);
      }
   }, [response]);

   useEffect(() => {
      const text = new AnimatedAppearText([['Latest&nbsp']]);
      if (hiven?.id) {
         if (hiven.attributes.news_banner.data?.attributes.url)
            setBannerSource(hiven.attributes.news_banner.data?.attributes?.url);
      }
   }, [hiven]);

   const handleLoadMore = () => {
      setPagination({ ...pagination, page: pagination.page + 1 });
   };

   const renderLoadMorePost = useMemo(() => {
      if (!response) return <></>;

      const {
         meta: { pagination },
      } = response;
      if (pagination.page >= pagination.pageCount) return <></>;

      return (
         <div className="load-more-post">
            <span data-magnetic onClick={handleLoadMore}>
               <div className="load-more-post_button">LOAD MORE POST</div>
            </span>
         </div>
      );
   }, [response]);

   return (
      <>
         <Head>
            <title>Hiven</title>
            <meta name="description" content="Hiven" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main style={{ height: 'auto' }}>
            <div
               className="news-banner__container"
               style={{ backgroundImage: `url(${bannerSource})` }}
            >
               <div className="about-us-banner__hexagon-container">
                  <div className="news-banner__hexagon__inner">
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
                  </div>
               </div>
               <div className="container-full">
                  <div className="news-banner__inner">
                     <div className="news-banner__title" data-aos="fade-up">
                        <h2 data-aos-delay="500">News</h2>
                        <div className="icon">
                           <IconHexagonSmall width={28} height={32} />
                        </div>
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
                        {news.length > 0 &&
                           news.map((item, idx) => (
                              <NewsCard key={idx} data={item.attributes} />
                           ))}
                        {loading &&
                           Array.from(new Array(pagination.pageSize)).map((_, idx) => (
                              <NewsCardSkeleton key={idx} />
                           ))}
                     </div>

                     {renderLoadMorePost}
                  </div>
               </div>
            </div>
         </main>
         <ContactWithUs />
      </>
   );
};
News.Layout = MainLayout;

export default News;
