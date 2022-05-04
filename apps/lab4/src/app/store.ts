import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { Profile } from './common/profile';
import * as Layout from './layouts';
import { Group } from './common/group';

const store = configureStore({
  reducer: {
    profile: Profile.reducer,
    layout: Layout.reducer,
    group: Group.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

export default store;
