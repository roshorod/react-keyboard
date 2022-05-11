import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { layout } from "../../layouts";
import { UpdateProfiles } from "./reducers/profiles/update-profiles";

const initialStateMap: Profile[] = [];

const preload: Profile[] = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")).profileList
  : initialStateMap;

const profileListSlice = createSlice({
  name: "profileList",
  initialState: preload,
  reducers: {
    updateProfiles: (state, action: PayloadAction<Profile>) => {
      UpdateProfiles(state, action.payload);
    },

    createProfile: (state) => {
      const signature: Profile = {
        id: uuidv4(),
        name: "profile-template",
        layout,
        groups: [],
      };

      state.push(signature);
    },
  },
});

export const { updateProfiles, createProfile } = profileListSlice.actions;
export const { reducer } = profileListSlice;
