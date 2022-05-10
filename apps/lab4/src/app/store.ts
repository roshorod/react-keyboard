import { configureStore } from "@reduxjs/toolkit";

import * as P from "./common/profile/profileSlice";
import * as PL from "./common/profile/profileListSlice";

const store = configureStore({
  reducer: {
    profile: P.reducer,
    profileList: PL.reducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
