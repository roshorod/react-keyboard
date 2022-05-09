import { createSlice } from "@reduxjs/toolkit";
import { AddKeyGroup } from "./reducers/add-key-group";
import { SelectGroup } from "./reducers/select-group";

const initialStateMap: Group = { name: "", color: "", groupKeys: [] };

const groupSlice = createSlice({
  name: "group",

  initialState: initialStateMap,

  reducers: {
    selectGroup: (state, action) => SelectGroup(state, action.payload),

    addKeyGroup: (state, action) => AddKeyGroup(state, action.payload),
  },
});

export const { selectGroup, addKeyGroup } = groupSlice.actions;
export const { reducer } = groupSlice;
