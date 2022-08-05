import React, { PureComponent } from 'react';
import { BreakpointContext } from './breakpoint-context';

class BreakpointProvider extends PureComponent {
   state = {
      windowWidth: 0,
   };

   componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
   }

   componentDidMount() {
      this.setState({
         windowWidth: window.innerWidth,
      });
      window.addEventListener('resize', this.updateDimensions);
   }

   updateDimensions = () => {
      this.setState({
         windowWidth: window.innerWidth,
      });
   };

   render() {
      return (
         <BreakpointContext.Provider
            value={{
               windowWidth: this.state.windowWidth,
            }}
         >
            {this.props.children && this.props.children}
         </BreakpointContext.Provider>
      );
   }
}

export default BreakpointProvider;
