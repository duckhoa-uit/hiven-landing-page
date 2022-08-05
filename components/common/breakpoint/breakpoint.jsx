import React, { PureComponent } from 'react';
import { Fragment } from 'react';
import { withBreakpoint } from './withBreakpoint';

const defaultBreakpoint = {
   // X-Small devices (portrait phones, less than 576px)
   xs: 0,
   // Small devices (landscape phones, less than 768px)
   sm: 576,
   // Medium devices (tablets, less than 992px)
   md: 768,
   // Large devices (desktops, less than 1200px)
   lg: 992,
   // X-Large devices (large desktops, less than 1400px)
   xl: 1200,
   // XX-Large devices (larger desktops)
   xxl: 1400,
};

class Breakpoint extends PureComponent {
   getBreakpoint = (isDown) => {
      let breakpoint = '';
      for (const bp in defaultBreakpoint) {
         if (this.props[bp]) {
            breakpoint = bp;
            break;
         }
      }
      if (breakpoint && isDown) {
         breakpoint = {
            xs: 'sm',
            sm: 'md',
            md: 'lg',
            lg: 'xl',
            xl: 'xxl',
         }[breakpoint];
      }
      return breakpoint;
   };

   render() {
      let display = true;
      const { windowWidth, customBreakpoint, down, up, only, children } = this.props;
      if (windowWidth) {
         let breakAt = null;
         if (customBreakpoint) {
            breakAt = Number(customBreakpoint);
         } else {
            let breakpoint = this.getBreakpoint(down);
            breakAt = breakpoint ? defaultBreakpoint[breakpoint] : null;
         }

         if (breakAt !== null && breakAt !== void 0 && !isNaN(breakAt) && (down || up || only)) {
            display = false;
            if (down && windowWidth < breakAt) {
               display = true;
            } else if (up && windowWidth >= breakAt) {
               display = true;
            } else if (only && windowWidth === breakAt) {
               display = true;
            }
         }

         if (display) {
            return <Fragment>{children && children}</Fragment>;
         }
      }
      return null;
   }
}

export default withBreakpoint(Breakpoint);
