import { createSlice } from "@reduxjs/toolkit";
import { AddKeyGroup } from "./add-key-group";
import { SelectGroup } from "./select-group";

const initialState: Group =  { name: '', color: '', groupKeys: [] };

const groupSlice = createSlice({
    name: 'group',

    initialState: initialState,

    reducers:  {
        selectGroup: (state, action) => SelectGroup(state, action.payload),

        addKeyGroup: (state, action) => AddKeyGroup(state, action.payload)
    }
});

export const {  selectGroup, addKeyGroup } = groupSlice.actions;
export const { reducer } = groupSlice;
