"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";

persistStore(store);
export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
