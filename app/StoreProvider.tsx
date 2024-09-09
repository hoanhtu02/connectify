"use client";
import { Provider } from "react-redux";
import { store, localStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
export default function StoreProvider({ children }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={localStore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
