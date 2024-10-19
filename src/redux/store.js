
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';


const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store);

export {store,persistor};
 