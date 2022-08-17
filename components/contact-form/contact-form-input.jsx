import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

export default function ContactFormInput({
   label,
   name,
   multiline = false,
   disabled = false,
}) {
   const { control } = useFormContext();
   const {
      field,
      fieldState: { error },
   } = useController({
      control,
      name,
   });

   return (
      <>
         <div className="contact-form__input">
            {multiline ? (
               <textarea
                  name="text message"
                  placeholder={label}
                  rows={5}
                  disabled={disabled}
                  {...field}
               ></textarea>
            ) : (
               <input
                  type="text"
                  placeholder={label}
                  data-aos="-hidden"
                  disabled={disabled}
                  {...field}
               />
            )}
            <span></span>
            <pre className={`error-message ${error ? 'active' : ''}`}>
               {error?.message}
            </pre>
         </div>
      </>
   );
}
