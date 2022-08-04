import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import ContactWithUs from '@components/contact-with-us/contact-with-us';
import ScrollToTop from '@components/scroll-to-top/scroll-to-top';
import Contact from 'pages/contact';

export default function MainLayout({ children }) {
   return (
      <>
         <Header />
         {children}
         <ScrollToTop />
         {children.type.name!=="Contact"&&<ContactWithUs/>}
         <Footer />
      </>
   );
}
