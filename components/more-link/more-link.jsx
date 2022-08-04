import IconHexagonSmall from '@components/icons/ic-hexagon-small';
import Link from 'next/link';
import React from 'react';

export default function MoreLink({ text, padding = false, light = false, ...rest }) {
   return (
      <div
         className="more-link"
         style={padding ? { padding: '24px 32px' } : undefined}
         {...rest}
      >
         <div className="animated-line">
            <IconHexagonSmall className="hexagon-icon" />
         </div>
         <a className={`text ${light ? 'light' : ''}`} data-cursor="-opaque">
            {text}
         </a>
      </div>
   );
}
