import MoreLink from '@components/more-link/more-link';
import React from 'react';
import ContactFormInput from './contact-form-input';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
   fullName: yup
      .string()
      .max(255)
      .matches(/^[a-zA-Z0-9]*$/, 'Only alphabets are allowed for this field')
      .required()
      .label('Name'),
   address: yup
      .string()
      .max(500)
      .matches(/^[a-zA-Z0-9]*$/, 'Only alphabets are allowed for this field')
      .label('Address'),
   phoneNumber: yup
      .string()
      .matches(
         /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
         'Phone number is not valid'
      )
      .max(255)
      .required()
      .label('Phone number'),
   message: yup.string().max(1000).required().label('Message'),
});
export default function ContactForm() {
   const formMethods = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         fullName: '',
         address: '',
         phoneNumber: '',
         message: '',
      },
   });

   const { handleSubmit } = formMethods;

   const onSubmit = handleSubmit((data) => {
      console.log('formSubmit', data);
   });

   return (
      <div className="contact-form">
         <div className="container-full">
            <div className="contact-form__inner">
               <div className="contact-form__title">
                  <h3 data-aos="fade-up">Get In Touch</h3>
               </div>
               <div className="contact-form__container">
                  <FormProvider {...formMethods}>
                     <form onSubmit={onSubmit}>
                        <ContactFormInput label="Your Name" name="fullName" />
                        <ContactFormInput label="EMAIL ADD" name="address" />
                        <ContactFormInput label="Phone Number" name="phoneNumber" />
                        <ContactFormInput
                           label="Message"
                           name="message"
                           multiline={true}
                        />

                        <button type="submit" id="submit-btn">
                           <MoreLink text={'SEND MAIL'} padding light />
                        </button>
                     </form>
                  </FormProvider>
               </div>
            </div>
         </div>
      </div>
   );
}
