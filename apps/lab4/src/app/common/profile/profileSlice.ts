import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateGroup } from "./reducers/group/create-group";
import { DeleteGroup } from "./reducers/group/delete-group";
import { UpdateGroup } from "./reducers/group/update-group";
import { v4 as uuidv4 } from "uuid";
import { layout } from "../../layouts";
import { SyncLayout } from "./reducers/layout/sync-layout";

const initialStateMap: Profile = {
  name: "profile-one",
  groups: [],
  layout,
  id: uuidv4(),
};

const preload: Profile = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")).profile
  : initialStateMap;

const profileSlice = createSlice({
  name: "profile",

  initialState: preload,

  reducers: {
    selectProfile: (state, action: PayloadAction<Profile>) => {
      Object.assign(state, action.payload);
    },

    updateLayout: (state, action) => {
      state.layout = action.payload;
    },

    syncLayout: (state, action: PayloadAction<Group>) => { 
      SyncLayout(state, action.payload);
    },

    createGroup: (state, action) => {
      CreateGroup(state, action.payload);
    },
    deleteGroup: (state, action) => {
      DeleteGroup(state, action.payload);
    },
    updateGroup: (state, action) => {
      UpdateGroup(state, action.payload);
    },
  },
});

export const {
  updateLayout,
  createGroup,
  deleteGroup,
  updateGroup,
  selectProfile,
  syncLayout,
} = profileSlice.actions;
export const { reducer } = profileSlice;
