import { createSlice } from "@reduxjs/toolkit";
import { SelectGroup } from "./select-group";

const initialState: Group = { name: '', color: ''};

const groupSlice = createSlice({
    name: 'group',

    initialState: initialState,

    reducers:  {
        selectGroup: (state, action) => SelectGroup(state, action.payload)
    }
});

export const {  selectGroup } = groupSlice.actions;
export const { reducer } = groupSlice;
