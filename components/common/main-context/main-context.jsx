import { markModalOpen } from '@utils/helper';
import React, { useContext, useEffect, useState } from 'react';

const __Context = React.createContext({
   isOpenMenuMb: false,
   setIsOpenMenuMb: () => {},
})

const MainContext = ({children}) => {
   const [isOpenMenuMb, setIsOpenMenuMb] = useState(false);

   useEffect(() => {
      markModalOpen(isOpenMenuMb);
      return () => {
         markModalOpen(false);
      };
   }, [isOpenMenuMb])

   return (
      <__Context.Provider value={{
         isOpenMenuMb: isOpenMenuMb,
         setIsOpenMenuMb: setIsOpenMenuMb,
      }}>
         {children}
      </__Context.Provider>
   );
};

export const useMainContext = () => {
   const context = useContext(__Context);
   return context;
}

export default MainContext;