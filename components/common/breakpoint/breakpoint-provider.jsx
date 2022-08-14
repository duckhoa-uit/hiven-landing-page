import React, { PureComponent } from 'react';
import ResizeDetector from '../resize-detector';
import { BreakpointContext } from './breakpoint-context';

class BreakpointProvider extends PureComponent {
   state = {
      windowWidth: 0,
   };

   onResize = (w, h) => {
      this.setState({
         windowWidth: w,
      });
   }

   render() {
      return (
         <BreakpointContext.Provider
            value={{
               windowWidth: this.state.windowWidth,
            }}
         >
            {this.props.children && this.props.children}
            <ResizeDetector onResize={this.onResize} />
         </BreakpointContext.Provider>
      );
   }
}

export default BreakpointProvider;
