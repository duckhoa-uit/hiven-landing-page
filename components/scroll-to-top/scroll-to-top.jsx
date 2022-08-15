import React, { useState, useEffect } from 'react';
import IconScrollToTop from '@components/icons/scroll-to-top';
import { useMainContext } from '@components/common/main-context/main-context';

export default function ScrollToTop() {
   const [visibleButton, setVisibleButton] = useState(false);
   const {isOpenMenuMb} = useMainContext();

   useEffect(() => {
      const toggleVisible = () => {
         if (window.scrollY > 1000) {
            setVisibleButton(true);
         } else {
            setVisibleButton(false);
         }
      };

      window.addEventListener('scroll', toggleVisible);

      return () => {
         window.removeEventListener('scroll', toggleVisible);
      };
   }, []);

   const handleScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };

   if(isOpenMenuMb) return null;
   return (
      <div
         data-cursor="-exclusion"
         className={`icon-scroll-to-top ${visibleButton ? 'active' : null}`}
         onClick={() => handleScrollToTop()}
      >
         <IconScrollToTop></IconScrollToTop>
      </div>
   );
}
