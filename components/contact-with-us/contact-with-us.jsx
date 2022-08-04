import React, { useEffect, useState, useRef } from 'react';
import IconNext from '@components/icons/ic-next';

export default function ContactWithUs() {
   return (
        <div className="row contact-us-container">
            <div className="contact-with-us">Contact with us</div>
            <div className="next-ic bounce">
            <IconNext />
            </div>
        </div>         
   );
}
