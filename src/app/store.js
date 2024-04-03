import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import TextAnimation from "./features/AnimationSlice";
import { thunk } from "redux-thunk";
import createLogger from "redux-logger";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, TextAnimation);

export const Store = configureStore({
  reducer: {
    TextAnimation: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, createLogger), // Add logger for debugging
});

export const persistor = persistStore(Store);
