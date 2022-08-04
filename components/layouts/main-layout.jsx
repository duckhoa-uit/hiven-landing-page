import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';

export default function MainLayout({ children }) {
   return (
      <>
         <Header />
         {children}
         <ScrollToTop />
         <Footer />
      </>
   );
}
