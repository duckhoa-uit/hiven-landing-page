import MoreLink from '@components/more-link/more-link';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

class CardHeader extends React.Component {
   render() {
      const { image } = this.props;
      return (
         <div id={image} className="card-header">
            <img src={image} alt="" />
         </div>
      );
   }
}

class CardBody extends React.Component {
   render() {
      return (
         <div className="card-body">
            <p className="date">Admin 01 - 2022-06-13 </p>

            <h2>{this.props.title}</h2>

            <p className="body-content">{this.props.text}</p>

            <div className="view-more">
               <MoreLink text={'Find Out More'} href={'https://www.kkfund.co/'} />
            </div>
         </div>
      );
   }
}

export default function NewsCard({ url, banner, className = '' }) {
   return (
      <a href={url} target="_blank" rel="noreferrer">
         <article className={'card' + className} data-cursor-text="View">
            <CardHeader image={banner} />
            <CardBody
               title={'New Joint Venture Fund'}
               text={
                  'Global grain trading CJ International Asia (CJIA) and Singapore-based KK Fund have launched Hiven, a joint venture fund to invest in startups developing breakthrough technologies in "food, agriculture, and bio" in Southeast Asia.'
               }
            />
         </article>
      </a>
   );
}
