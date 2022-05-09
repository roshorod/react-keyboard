import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateGroup } from "./reducers/create-group";
import { DeleteGroup } from "./reducers/delete-group";
import { UpdateGroup } from "./reducers/update-group";
import { v4 as uuidv4 } from "uuid";
import { layout } from "../../layouts";

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
      const groupKeys = action.payload.groupKeys;

      const color = action.payload.color;

      let map;

      if (groupKeys.length !== 0)
        map = state.layout.map((row) =>
          row.map((key) => {
            let found = false;

            groupKeys.forEach((keyInGroup) =>
              keyInGroup.id === key.id ? (found = true) : false
            );

            return found ? { ...key, color, selected: true } : key;
          })
        );

      Object.assign(state.layout, map);
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
