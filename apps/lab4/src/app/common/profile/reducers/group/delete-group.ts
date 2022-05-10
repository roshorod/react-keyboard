export const DeleteGroup = (state: Profile, group: Group) => {
  const keys = group.groupKeys;

  const newLayout = state.layout.map((row) =>
    row.map((key) => {
      let found = false;

      keys.forEach((k) => (k.id === key.id ? (found = true) : false));

      if (found) {
        let signature: Key = { ...key, selected: false };

        delete signature.color;

        return signature;
      } else return key;
    })
  );

  const newGroups = state.groups.filter((groups) => groups.id != group.id);
  state.layout = newLayout;
  state.groups = newGroups;
};
