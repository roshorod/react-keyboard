import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateGroup } from "./create-group";
import { DeleteGroup } from "./delete-group";
import { UpdateGroup } from "./update-group";
import { v4 as uuidv4 } from "uuid";

const initialStateMap: Profile = {
  name: "profile-one",
  groups: [],
  layout: [],
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
} = profileSlice.actions;
export const { reducer } = profileSlice;
