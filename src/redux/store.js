
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import logger from 'redux-logger';

const middlewares = [logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
 