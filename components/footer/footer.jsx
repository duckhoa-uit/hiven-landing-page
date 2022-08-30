/* eslint-disable @next/next/no-html-link-for-pages */
import IconFacebook from '@components/icons/ic-fb';
import IconLinkedIn from '@components/icons/ic-linkedin';
import IconLogo from '@components/icons/ic-logo-footer';
import IconTwitter from '@components/icons/ic-twitter';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
   const hiven = useSelector((x) => x.hiven.data);
   const [address, setAddress] = useState(
      `20 Cecil Street <br /> #12-03 PLUS <br /> Singapore 049705`
   );
   const [phone, setPhone] = useState('+65 6645 3838');
   const [email, setEmail] = useState('info@hiven.com.sg');

   useEffect(() => {
      if (hiven?.id) {
         setAddress(hiven.attributes.contact_address.replace(/\n/g, '<br />'));
         setPhone(hiven.attributes.contact_phone);
         setEmail(hiven.attributes.contact_email);
      }
   }, [hiven?.id]);

   return (
      <footer className="footer-container">
         <div className="footer-content-container" data-cursor="-inverse">
            <div className="row footer-content">
               <div className="Hiven-info">
                  <IconLogo className="logo footer-logo" />
                  {address.split('<br />').map((str) => (
                     <p key={str}>{str}</p>
                  ))}
               </div>

               <div className="link-group">
                  <div className="quick-link">
                     <p className="quick-link__title">QUICKLINK</p>
                     <ul className="footer-links">
                        <li>
                           <Link href="/" passHref>
                              <a
                                 className="translate-btn"
                                 data-text="Home"
                                 data-cursor="-opaque"
                              >
                                 <span>Home</span>
                              </a>
                           </Link>
                        </li>
                        <li>
                           <Link href="/about-us" passHref>
                              <a
                                 className="translate-btn"
                                 data-text="About Us"
                                 data-cursor="-opaque"
                              >
                                 <span>About Us</span>
                              </a>
                           </Link>
                        </li>
                        <li>
                           <Link href="/news" passHref>
                              <a
                                 className="translate-btn"
                                 data-text="News"
                                 data-cursor="-opaque"
                              >
                                 <span>News</span>
                              </a>
                           </Link>
                        </li>
                     </ul>
                  </div>

                  <div className="contact">
                     <p className="contact__title">CONTACT</p>
                     <ul className="footer-links">
                        <li>
                           <a
                              href={`tel:${phone}`}
                              className="translate-btn"
                              data-text={phone}
                              data-cursor="-opaque"
                           >
                              <span>{phone}</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href={`mailto:${email}`}
                              className="translate-btn"
                              data-text={email}
                              data-cursor="-opaque"
                           >
                              <span>{email}</span>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="row copy-right-Social">
               <p className="copyright-text">@ Copyright 2022 - Hiven Group</p>

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
