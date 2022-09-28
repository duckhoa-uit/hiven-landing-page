import ContactForm from '@components/contact-form/contact-form';
import ContactInformation from '@components/contact-information/contact-information';
import MainLayout from '@components/layouts/main-layout';
import Head from 'next/head';

const Contact = () => {
   return (
      <>
         <Head>
            <title>Hiven</title>
         </Head>

         <ContactInformation />
         <ContactForm />
      </>
   );
};
Contact.Layout = MainLayout;

export default Contact;
