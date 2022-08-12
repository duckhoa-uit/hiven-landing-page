/* eslint-disable react/jsx-max-props-per-line */
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import IconPerson from './ic-person';
import { NavItem } from './nav-item';

const items = [
   {
      href: '/admin',
      icon: <IconPerson width={24} height={24} />,
      title: 'Home',
   },
   {
      href: '/admin/about-us',
      icon: <IconPerson width={24} height={24} />,
      title: 'About Us',
   },
   {
      href: '/admin/contact',
      icon: <IconPerson width={24} height={24} />,
      title: 'Contact',
   },
   {
      href: '/admin/news',
      icon: <IconPerson width={24} height={24} />,
      title: 'News',
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
                  <a style={{ mt: 2, textDecoration: 'none' }}>
                     <Typography variant="h3" sx={{ color: '#fff' }}>
                        Hiven
                     </Typography>
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
               />
            ))}
         </Box>
         {/* <Divider sx={{ borderColor: '#394f73' }} /> */}
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

         if (open) {
            onClose?.();
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [router.asPath]
   );

   return (
      <Drawer
         anchor="left"
         open
         PaperProps={{
            sx: {
               backgroundColor: '#252E42',
               color: '#FFFFFF',
               width: lgUp ? 280 : 100,
            },
         }}
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
