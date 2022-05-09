import { configureStore } from "@reduxjs/toolkit";

import { Profile, ProfileList } from "./common/profile";
import { Group } from "./common/group";

const store = configureStore({
  reducer: {
    profile: Profile.reducer,
    group: Group.reducer,
    profileList: ProfileList.reducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
