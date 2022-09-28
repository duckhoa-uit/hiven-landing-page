/* eslint-disable @next/next/no-img-element */

export default function HexagonImage({ source, alt = '' }) {
   return (
      <div className="hexagon-image__container">
         <div
            className="hexagon-image"
            data-source={source}
            style={{ backgroundImage: `url(${source})` }}
            data-aos="zoom-in"
         />
         <div className="hexagon__outer-1">
            <img
               src="/icon-hexagon.webp"
               alt="icon-hexagon-outer"
               data-aos-anchor={`[data-source="${source}"]`}
               data-aos="zoom-in"
               data-aos-delay="100"
            />
         </div>
         <div className="hexagon__outer-2">
            <img
               src="/icon-hexagon.webp"
               alt="icon-hexagon-outer"
               data-aos-anchor={`[data-source="${source}"]`}
               data-aos="zoom-in"
               data-aos-delay="200"
            />
         </div>
      </div>
   );
}
