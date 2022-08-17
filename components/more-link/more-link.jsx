import IconHexagonSmall from '@components/icons/ic-hexagon-small';

export default function MoreLink({
   link,
   text,
   padding = false,
   light = false,
   disabled = false,
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
            <IconHexagonSmall className={`hexagon-icon ${disabled ? '' : 'active'}`} />
         </div>
         <a href={link} className={`text ${light ? 'light' : ''}`}>
            {text}
         </a>
      </div>
   );
}
