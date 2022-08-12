import React from 'react';
import { BreakpointContext } from './breakpoint-context';

const useBreakpoint = () => {
   const { windowWidth } = React.useContext(BreakpointContext);

   return {
      windowWidth,
   }
};

export default useBreakpoint;