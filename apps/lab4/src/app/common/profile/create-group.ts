import { PayloadAction } from "@reduxjs/toolkit";

export const CreateGroup = (state: Profile, group: Group)  =>  {
    state.groups.push(group);
}
