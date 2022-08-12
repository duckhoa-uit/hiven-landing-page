import { configureStore } from '@reduxjs/toolkit';

import hivenReducer from './hivenSlice';

export function makeStore() {
   return configureStore({
      reducer: { hiven: hivenReducer },
   });
}

const store = makeStore();

export default store;
