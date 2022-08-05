import React, { PureComponent } from 'react';
import { BreakpointContext } from './breakpoint-context';

export const withBreakpoint = (WrappedComponent) => {
   return class BreakpointHOC extends PureComponent {
      render() {
         return (
            <BreakpointContext.Consumer>
               {(context) => (
                  <WrappedComponent {...this.props} windowWidth={context.windowWidth} />
               )}
            </BreakpointContext.Consumer>
         );
      }
   };
};
