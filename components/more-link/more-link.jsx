import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import Link from 'next/link';
import React from 'react';

export default function MoreLink({
   link,
   text,
   padding = false,
   light = false,
   ...rest
}) {
   return (
      <div
         className="more-link"
         style={padding ? { padding: '24px 32px' } : undefined}
         {...rest}
         data-cursor="-opaque"
      >
         <div className="animated-line">
            <IconHexagonSmall className="hexagon-icon" />
         </div>
         <a href={link} className={`text ${light ? 'light' : ''}`}>
            {text}
         </a>
      </div>
   );
}
