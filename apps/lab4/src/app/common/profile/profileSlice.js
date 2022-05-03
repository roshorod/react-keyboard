import { createSlice } from "@reduxjs/toolkit";

const initialStateMap = {
    name: 'profile-one',
    groups: [],
    layout: []
};

const profileSlice = createSlice({
    name: 'profile',

    initialState: initialStateMap,

    reducers: {
        initLayout: (state, action) => {
            state.layout = action.payload;
        }
    }
});

export const { initLayout } = profileSlice.actions;
export const { reducer } = profileSlice;
