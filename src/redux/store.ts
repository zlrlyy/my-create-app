import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types';

//https://github.com/vercel/next.js/discussions/15687
export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage('local');
}
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createPersistStorage();
const persistConfig = {
  key: 'root',
  storage,
  // 黑名单 不缓存的
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
