/* eslint-disable @next/next/no-html-link-for-pages */
import IconFacebook from '@components/icons/ic-fb';
import IconLinkedIn from '@components/icons/ic-linkedin';
import IconLogo from '@components/icons/ic-logo-footer';
import IconTwitter from '@components/icons/ic-twitter';
import Link from 'next/link';

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
                              href="mailto:info@hiven.com.sg"
                              className="translate-btn"
                              data-text="info@hiven.com.sg"
                              data-cursor="-opaque"
                           >
                              <span>info@hiven.com.sg</span>
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
