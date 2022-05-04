import { createSlice } from "@reduxjs/toolkit";
import { CreateGroup } from "./create-group";
import { DeleteGroup } from "./delete-group";
import { UpdateGroup } from "./update-group";

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
        deleteGroup: (state, action) => { DeleteGroup(state, action.payload) },
        updateGroup: (state, action) => { UpdateGroup(state, action.payload) }
    }
});

export const { initLayout, createGroup, deleteGroup, updateGroup } = profileSlice.actions;
export const { reducer } = profileSlice;
