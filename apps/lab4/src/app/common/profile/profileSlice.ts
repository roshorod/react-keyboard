import { createSlice } from "@reduxjs/toolkit";
import { CreateGroup } from "./create-group";
import { DeleteGroup } from "./delete-group";

const initialStateMap: Profile = {
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
        },

        createGroup: (state, action) => { CreateGroup(state, action.payload) },
        deleteGroup: (state, action) => { DeleteGroup(state, action.payload) }
    }
});

export const { initLayout, createGroup, deleteGroup } = profileSlice.actions;
export const { reducer } = profileSlice;
