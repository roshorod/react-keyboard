import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { layout } from "../../layouts";


const initialStateMap: Profile[] = [];

const preload: Profile[] = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")).profileList
  : initialStateMap;

const profileListSlice = createSlice({
  name: "profileList",
  initialState: preload,
  reducers: {
    updateProfiles: (state, action: PayloadAction<Profile>) => {
      const profile = action.payload;

      const updated = state.map((p) => (p.id === profile.id ? profile : p));

      if (updated.length === 0) updated.push(profile);

      Object.assign(state, updated);
    },

    createProfile: (state) => {
      const signature: Profile = { id: uuidv4(), name: "profile-template", layout, groups: [] };

      state.push(signature);
    }
  },
});

export const { updateProfiles, createProfile } = profileListSlice.actions;
export const { reducer } = profileListSlice;
