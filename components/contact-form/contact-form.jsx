import MoreLink from '@components/more-link/more-link';
import React from 'react';
import ContactFormInput from './contact-form-input';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosClient from '@components/api-client/axios-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const schema = yup.object({
   fullName: yup
      .string()
      .max(255)
      .matches(/^[A-Za-z\s]*$/, 'Only alphabets are allowed for this field')
      .required()
      .label('Name'),
   email: yup.string().email().max(500).required().label('Email'),
   phoneNumber: yup
      .string()
      .matches(
         /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
         'Phone number is not valid'
      )
      .max(255)
      .required()
      .label('Phone number'),
   message: yup.string().max(1000).required().label('Message'),
});

export default function ContactForm() {
   const hiven = useSelector((x) => x.hiven.data);

   const formMethods = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         fullName: '',
         email: '',
         phoneNumber: '',
         message: '',
      },
   });

   const {
      formState: { isSubmitting },
      handleSubmit,
      reset,
   } = formMethods;

   const onSubmit = handleSubmit(async (data) => {

      const receiveEmail = hiven.attributes.contact_form_email_receive;
      if (!receiveEmail) {
         toast.error('Something has error, please try again later.');
         return;
      }

      try {
         const formData = {
            name: data.fullName,
            email: data.email,
            receiveEmail: receiveEmail,
            phoneNumber: data.phoneNumber,
            message: data.message,
         };
         // const res = await axios.post(`/ajax/${receiveEmail}`, formData, {
         //    baseURL: 'https://formsubmit.co',
         //    'Content-Type': 'application/json',
         // });
         const res = await axiosClient.post(`/email`, formData);
         console.log(res);
         toast.success(
            'Your submission has been sent, we will contact you as soon as possible.',
            {
               autoClose: 8000,
            }
         );
         reset();
      } catch (error) {
         toast.error('Something has error, please try again later.');
         console.log(error);
      }
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
                        <ContactFormInput
                           label="Your Name"
                           name="fullName"
                           disabled={isSubmitting}
                        />
                        <ContactFormInput
                           label="EMAIL ADDRESS"
                           name="email"
                           disabled={isSubmitting}
                        />
                        <ContactFormInput
                           label="Phone Number"
                           name="phoneNumber"
                           disabled={isSubmitting}
                        />
                        <ContactFormInput
                           label="Message"
                           name="message"
                           multiline={true}
                           disabled={isSubmitting}
                        />

                        <button disabled={isSubmitting} type="submit" id="submit-btn">
                           <MoreLink
                              disabled={isSubmitting}
                              text={`${isSubmitting ? 'SENDING MAIL ...' : 'SEND MAIL'} `}
                              padding
                              light
                           />
                        </button>
                     </form>
                  </FormProvider>
               </div>
            </div>
         </div>
      </div>
   );
}
