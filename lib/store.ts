"use client"
import { configureStore, combineReducers, UnknownAction, } from '@reduxjs/toolkit'
import chatReducer from '@/lib/features/chat/chatSlice'
import socketMiddleware from '@/middleware/clientSocketMiddleware'
import userReducer from '@/lib/features/user/userSlice'
import settingReducer from './features/setting/settingSlice'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const reducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  setting: settingReducer
})

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");
const persistRder = persistReducer<RootState>({
  key: "persist",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["setting"]
}, reducer)
export const store = configureStore({
  reducer: persistRder,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([socketMiddleware]),
})
export const localStore = persistStore(store)

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducer>
export type AppDispatch = AppStore['dispatch']