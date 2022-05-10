export const DeleteKey = (state: Profile, key: Key, group: Group) => {
  if (!group.id) return;

  const filtredKeys = group.groupKeys.filter((k) => k.id !== key.id);

  const newGroups = state.groups.map((localGroup) =>
    localGroup.id === group.id
      ? { ...localGroup, groupKeys: filtredKeys }
      : localGroup
  );

  const newLayout = state.layout.map((row) =>
    row.map((k) => {
      if (k.id === key.id) {
        const signature: Key = { ...k, selected: false };
        delete signature.color;
        return signature;
      } else return k;
    })
  );

  Object.assign(state.groups, newGroups);
  Object.assign(state.layout, newLayout);
};
