export const UpdateGroup = (state: Profile, group: Group) => {
  const updated = state.groups.map((item) =>
    item.id == group.id ? group : item
  );

  state.groups = updated;
};
