/* eslint-disable @next/next/no-img-element */
import IconUpload from '@components/icons/ic-upload';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import emptyImage from '../../assets/images/empty-image.png';

export default function ImageUploadField(props) {
   const { name, label, disabled = false, ...restProps } = props;
   const { control } = useFormContext();

   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { error },
   } = useController({
      name,
      control,
   });

   const loadFile = (event) => {
      if (event.target.files) {
         onChange(event.target.files[0]);
      }
   };

   const renderFileURL = (file) => {
      if (file?.type && file?.type.startsWith('image')) return URL.createObjectURL(file);

      if (!file?.url) return emptyImage;

      if (file.url) return file.url;
   };

   return (
      <div className={`image-upload__container ${error ? 'has-error' : ''}`}>
         <input
            ref={ref}
            type="file"
            accept="image/*"
            name={name}
            id={name}
            onChange={loadFile}
            style={{ display: 'none' }}
         />
         <Image
            layout="fill"
            src={renderFileURL(value)}
            width="200"
            alt=""
            style={{ borderRadius: 4 }}
         />
         <div className="image-upload__overlay">
            <label htmlFor={name} style={{ cursor: 'pointer' }}>
               <IconUpload width={50} height={50} />
            </label>
         </div>
         <p className="error-message">{error?.message}</p>
      </div>
   );
}
