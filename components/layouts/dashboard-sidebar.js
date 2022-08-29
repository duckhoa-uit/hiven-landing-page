/* eslint-disable react/jsx-max-props-per-line */
import IconHome from '@components/icons/ic-home';
import IconInfo from '@components/icons/ic-info';
import IconNews from '@components/icons/ic-news';
import IconLogo from '@components/icons/logo';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import IconPerson from './ic-person';
import IconRegion from './ic-region';
import { NavItem } from './nav-item';

const items = [
   {
      href: '/admin/home',
      icon: <IconHome />,
      title: 'Home',
   },
   {
      href: '/admin/about-us',
      icon: <IconInfo />,
      title: 'About Us',
   },
   {
      href: '/admin/contact',
      icon: <IconPerson width={24} height={24} />,
      title: 'Contact',
   },
   {
      href: '/admin/news',
      icon: <IconNews />,
      title: 'News',
   },
   {
      href: '/admin/investment-area',
      icon: <IconRegion />,
      title: 'Investment Area',
   },
];

const Content = ({ lgUp }) => {
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
         }}
      >
         <div>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
               <NextLink href="/admin" passHref>
                  <a style={{ mt: 2, textDecoration: 'none', color: 'inherit' }}>
                     <IconLogo />
                  </a>
               </NextLink>
            </Box>
         </div>
         <Divider
            sx={{
               borderColor: '#394f73',
               my: 3,
            }}
         />
         <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => (
               <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={lgUp ? item.title : ''}
                  // title={item.title}
               />
            ))}
         </Box>
      </Box>
   );
};

export const DashboardSidebar = (props) => {
   const { open, onClose } = props;
   const router = useRouter();
   const lgUp = useMediaQuery('(min-width:1200px)', {
      defaultMatches: true,
      noSsr: false,
   });
   useEffect(
      () => {
         if (!router.isReady) {
            return;
         }
         // if(lgUp) !open
         if (open) {
            onClose?.();
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [router.asPath]
   );

   if (lgUp) {
      return (
         <Drawer
            anchor="left"
            open
            PaperProps={{
               sx: {
                  backgroundColor: 'neutral.900',
                  color: '#FFFFFF',
                  width: lgUp ? 280 : 100,
               },
            }}
            variant="permanent"
         >
            <Content lgUp={lgUp} />
         </Drawer>
      );
   }

   return (
      <Drawer
         anchor="left"
         open={open}
         PaperProps={{
            sx: {
               backgroundColor: 'neutral.900',
               color: '#FFFFFF',
               width: lgUp ? 280 : 100,
               // width: 280,
            },
         }}
         sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
         variant="permanent"
      >
         <Content lgUp={lgUp} />
      </Drawer>
   );
};

DashboardSidebar.propTypes = {
   onClose: PropTypes.func,
   open: PropTypes.bool,
};
