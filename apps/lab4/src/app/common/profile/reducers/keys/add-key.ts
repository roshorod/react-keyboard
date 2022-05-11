export const AddKey = (state: Profile, key: Key, group: Group) => {
  if (!group.id) return;

  const newGroups = state.groups.map((localGroup) => {
    if (localGroup.id === group.id) {
      localGroup.groupKeys.push(key);
      return localGroup;
    } else return localGroup;
  });

  const newLayout = state.layout.map((row) =>
    row.map((keyInLayout) =>
      keyInLayout.id === key.id
        ? { ...keyInLayout, selected: true, color: group.color }
        : keyInLayout
    )
  );

  Object.assign(state.groups, newGroups);
  Object.assign(state.layout, newLayout);
};
