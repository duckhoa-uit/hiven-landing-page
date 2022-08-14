import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IconLogo from '@components/icons/logo';
import ActiveLink from '@components/active-link/active-link';
import { useRouter } from 'next/router';
import IconFacebook from '@components/icons/ic-fb';
import IconTwitter from '@components/icons/ic-twitter';
import IconLinkedIn from '@components/icons/ic-linkedin';

export default function Header() {
   const [activeMobileMenu, setActiveMobileMenu] = useState(false);
   const [stickyHeader, setStickyHeader] = useState(false);
   const { pathname } = useRouter();

   useEffect(() => {
      const listener = () =>
         window.scrollY > 160 ? setStickyHeader(true) : setStickyHeader(false);
      window.addEventListener('scroll', listener);

      return () => {
         window.removeEventListener('scroll', listener);
      };
   }, []);

   useEffect(() => {
      setActiveMobileMenu(false);
   }, [pathname]);

   const toggleMobileMenu = () => {
      setActiveMobileMenu(!activeMobileMenu);
   };

   return (
      <header className={stickyHeader ? 'sticky-header' : undefined}>
         <div className="container-full">
            <nav className="nav">
               <Link href="/">
                  <a
                     className="logo"
                     style={{ color: activeMobileMenu ? '#fff' : undefined }}
                  >
                     <IconLogo />
                  </a>
               </Link>

               <div
                  className={`menu-btn ${activeMobileMenu ? 'active' : ''}`}
                  onClick={toggleMobileMenu}
               >
                  <div className="hamburger">
                     <span className="line one"></span>
                     <span className="line two"></span>
                     <span className="line three"></span>
                  </div>
               </div>

               <ul className="nav-list">
                  <li>
                     <ActiveLink activeClassName="active" href="/">
                        <a className="nav-link">Home</a>
                     </ActiveLink>
                  </li>
                  <li>
                     <ActiveLink activeClassName="active" href="/about-us">
                        <a className="nav-link">About Us</a>
                     </ActiveLink>
                  </li>
                  <li>
                     <ActiveLink activeClassName="active" href="/news">
                        <a className="nav-link">News</a>
                     </ActiveLink>
                  </li>
                  <li>
                     <ActiveLink activeClassName="active" href="/contact">
                        <a className="nav-link nav-cta--mobile">Contact Us</a>
                     </ActiveLink>
                  </li>
                  <li>
                     <div className="social">
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
                  </li>
               </ul>

               <span data-magnetic>
                  <Link href="/contact">
                     <button id="nav-cta">
                        <a>Contact Us</a>
                     </button>
                  </Link>
               </span>
            </nav>
         </div>
      </header>
   );
}
