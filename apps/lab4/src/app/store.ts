import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { Profile } from './common/profile';
import * as Layout from './layouts';

const profile = Profile.reducer;
const layout = Layout.reducer;

const store = configureStore({
  reducer: combineReducers({
    profile,
    layout
  })
});

export type State = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

export default store;
