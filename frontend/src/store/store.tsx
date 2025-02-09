import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice/apiSlice';
import userReducer from './features/authSlice/authSlice';
import { paymentApiSlice } from './features/paymentApiSlice/paymentApiSlice';
import searchSlice from './features/search/searchSlice';
import { tourApiSlice } from './features/tourApiSlice/tourApiSlice';

export const store = configureStore({
  reducer: {
    data: searchSlice,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    tourApi: tourApiSlice.reducer,
    paymentApi: paymentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      tourApiSlice.middleware,
      paymentApiSlice.middleware
    ),
  devTools: true,
});

// Define RootState type for Redux store
export type RootState = ReturnType<typeof store.getState>;

export default store;
