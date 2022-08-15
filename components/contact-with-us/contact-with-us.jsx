import React, { useEffect, useState, useRef } from 'react';
import IconNext from '@components/icons/ic-next';
import Link from 'next/link';

export default function ContactWithUs() {
   return (
        <Link href="/contact" passHref>
            <div className="row contact-us-container">
                <div className='contact-with-us__container'>
                    <div className="contact-with-us">Contact with us</div>
                    <div className="next-ic bounce">
                        <IconNext />
                    </div>
                </div>                
            </div>    
        </Link>     
   );
}
