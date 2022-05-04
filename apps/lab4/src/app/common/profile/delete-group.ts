
export const DeleteGroup = (state: Profile, group: Group)  =>  {
    const filtered = state.groups.filter(groups => groups.id != group.id);

    state.groups = filtered;
}
