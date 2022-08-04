/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import IconLogo from '@components/icons/logo';
import ActiveLink from '@components/active-link/active-link';
import IconNext from '@components/icons/ic-next';
import IconLogoRight from '@components/icons/ic-logo-white';
import IconFacebook from '@components/icons/ic-fb';
import IconTwitter from '@components/icons/ic-twitter';
import IconLinkedIn from '@components/icons/ic-linkedin';
import ContactWithUs from '@components/contact-with-us/contact-with-us';

export default function Footer() {
   const handleScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };

   return (
      <footer className="footer-container">
         <div className="footer-content-container" data-cursor="-inverse">
            <div className="row footer-content">
               <div className="Hiven-info">
                  <IconLogo className="logo footer-logo" />
                  <h3>20 Cecil Street</h3>
                  <h3>#12-03 PLUS</h3>
                  <h3>Singapore 049705</h3>
               </div>

               <div className="link-group">
                  <div className="quick-link">
                     <h6>QUICKLINK</h6>
                     <ul className="footer-links">
                        <li>
                           <a
                              href="/"
                              className="translate-btn"
                              data-text="Home"
                              data-cursor="-opaque"
                           >
                              <span>Home</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href="/about-us"
                              className="translate-btn"
                              data-text="About Us"
                              data-cursor="-opaque"
                           >
                              <span>About Us</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href="/portfolio"
                              className="translate-btn"
                              data-text="Portfolio"
                              data-cursor="-opaque"
                           >
                              <span>Portfolio</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href="/news"
                              className="translate-btn"
                              data-text="New"
                              data-cursor="-opaque"
                           >
                              <span>New</span>
                           </a>
                        </li>
                     </ul>
                  </div>

                  <div className="contact">
                     <h6>CONTACT</h6>
                     <ul className="footer-links">
                        <li>
                           <a
                              href="tel:+65 6645 3838"
                              className="translate-btn"
                              data-text="+65 6645 3838"
                              data-cursor="-opaque"
                           >
                              <span>+65 6645 3838</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href="mailto:info@hiven.com"
                              className="translate-btn"
                              data-text="info@hiven.com"
                              data-cursor="-opaque"
                           >
                              <span>info@hiven.com</span>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="row copy-right-Social">
               <a href="#" className="copyright-text">
                  @ Copyright 2022 - Hiven Group
               </a>

               <div className="social">
                  <p>Social Media</p>
                  <a
                     href="https://www.facebook.com/"
                     className="social-icon"
                     data-cursor="-opaque"
                  >
                     <IconFacebook />
                  </a>
                  <a
                     href="https://twitter.com/"
                     className="social-icon"
                     data-cursor="-opaque"
                  >
                     <IconTwitter />
                  </a>
                  <a
                     href="https://www.linkedin.com/"
                     className="social-icon"
                     data-cursor="-opaque"
                  >
                     <IconLinkedIn />
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
}
