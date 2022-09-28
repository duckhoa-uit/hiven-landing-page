/* eslint-disable react/display-name */
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '@utils/create-emotion-cache';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

class CustomDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/apple-touch-icon.png"
               />
               <link rel="icon" href="/favicon.ico" />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon-32x32.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon-16x16.png"
               />
               <meta
                  property="og:title"
                  content="Unlocking Potential in South-East Asia"
                  key="title"
               />
               <meta
                  property="og:description"
                  content="We are an early-stage, Southeast Asia focused venture capital, covering Agri Tech, Food Tech, Bio Tech, Media & Entertainment, Mobility, Fin Tech, etc"
                  key="title"
               />
               <meta
                  name="description"
                  content="We are an early-stage, Southeast Asia focused venture capital, covering Agri Tech, Food Tech, Bio Tech, Media & Entertainment, Mobility, Fin Tech, etc"
                  key="description"
               />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

CustomDocument.getInitialProps = async (ctx) => {
   const originalRenderPage = ctx.renderPage;
   const cache = createEmotionCache();
   const { extractCriticalToChunks } = createEmotionServer(cache);

   ctx.renderPage = () =>
      originalRenderPage({
         enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      });

   const initialProps = await Document.getInitialProps(ctx);
   const emotionStyles = extractCriticalToChunks(initialProps.html);
   const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
         data-emotion={`${style.key} ${style.ids.join(' ')}`}
         key={style.key}
         // eslint-disable-next-line react/no-danger
         dangerouslySetInnerHTML={{ __html: style.css }}
      />
   ));

   return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
   };
};

export default CustomDocument;
