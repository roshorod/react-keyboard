import { createSlice } from "@reduxjs/toolkit";

const initialState: Group = {
    name: "test",
    color: "white"
};

const groupSlice = createSlice({
    name: 'group',

    initialState: initialState,

    reducers:  {
    }
});


export const {  } = groupSlice.actions;
export const { reducer } = groupSlice;
