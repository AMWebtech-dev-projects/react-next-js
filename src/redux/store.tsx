import thunk from "redux-thunk";
import { rootReducer } from "./reducer/rootReducer";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";

import { enc, AES } from "crypto-js";
import { composeWithDevTools } from "redux-devtools-extension";

const generateSecretKey = () => {
  const secretKey = "2wsxvfr45tgbnhy67ujm";
  return secretKey;
};

const secretKey = generateSecretKey();

const encryptor = createTransform(
  (inboundState, key) => {
    // Encrypt the inbound state using the secret key
    const encryptedState = AES.encrypt(
      JSON.stringify(inboundState),
      secretKey
    ).toString();
    return encryptedState;
  },
  (outboundState, key) => {
    // Decrypt the outbound state using the secret key
    const decryptedState = JSON.parse(
      AES.decrypt(outboundState, secretKey).toString(enc.Utf8)
    );
    return decryptedState;
  }
);

const persistConfig = {
  key: "Admin",
  storage: storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as Reducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
const makeStore = () => store;
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
