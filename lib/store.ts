import { configureStore, combineReducers } from '@reduxjs/toolkit'
import chatReducer from './features/chat/chatSlice'
import socketMiddleware from '@/middleware/clientSocketMiddleware'
import userReducer from './features/user/userSlice'

const reducer = combineReducers({
  chat: chatReducer,
  user: userReducer
})
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([socketMiddleware])
})

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducer>
export type AppDispatch = AppStore['dispatch']