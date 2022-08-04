import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IconLogo from '@components/icons/logo';
import ActiveLink from '@components/active-link/active-link';

export default function Header() {
   const [activeMobileMenu, setActiveMobileMenu] = useState(false);
   const [stickyHeader, setStickyHeader] = useState(false);

   useEffect(() => {
      const listener = () =>
         window.scrollY > 160 ? setStickyHeader(true) : setStickyHeader(false);
         window.addEventListener('scroll', listener);

      return () => {
         window.removeEventListener('scroll', listener);
      };
   }, []);

   const toggleMobileMenu = (e) => {
      setActiveMobileMenu(!activeMobileMenu);
   };

   return (
      <header
         className={stickyHeader ? 'sticky-header' : undefined}
         // data-cursor="-inverse"
      >
         <div className="container-full">
            <nav className="nav">
               <Link href="/">
                  <a className="logo">
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
                     <Link href="/contact" passHref>
                        <a id="nav-cta--mobile">Contact Us</a>
                     </Link>
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
