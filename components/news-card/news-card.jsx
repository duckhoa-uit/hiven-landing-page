import MoreLink from '@components/more-link/more-link';
import { Skeleton } from '@mui/material';
import { formatDate } from '@utils/helper';
import React from 'react';

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
      const { data } = this.props;
      const { createdAt, title, content, link } = data;

      return (
         <div className="card-body">
            <p className="date">{formatDate(createdAt)}</p>
            <h3>{title}</h3>
            <p className="body-content">{content}</p>
            <div className="view-more">
               <MoreLink text={'Find Out More'} href={link} />
            </div>
         </div>
      );
   }
}

export default function NewsCard({ data, className = '' }) {
   const { link, image } = data;
   return (
      <a href={link} target="_blank" rel="noreferrer">
         <article className={'card' + className}>
            <CardHeader image={image.data ? image.data[0].attributes.url : ''} />
            <CardBody data={data} />
         </article>
      </a>
   );
}

export const NewsCardSkeleton = () => {
   return (
      <article className={'card card--skeleton'}>
         <div className="card-header">
            <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
         </div>
         <div className="card-body">
            <p className="date">
               <Skeleton variant="text" />
            </p>

            <h2>
               <Skeleton variant="text" />
            </h2>

            <p className="body-content">
               <Skeleton variant="rectangular" width="100%" height={150} />
            </p>
         </div>
      </article>
   );
};
