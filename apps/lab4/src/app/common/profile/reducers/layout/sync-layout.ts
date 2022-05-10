export const SyncLayout = (state, group: Group) => {
  const groupKeys = group.groupKeys;

  const color = group.color;

  let map;

  if (groupKeys.length !== 0)
    map = state.layout.map((row) =>
      row.map((key) => {
        let found = false;

        groupKeys.forEach((keyInGroup) =>
          keyInGroup.id === key.id ? (found = true) : false
        );

        return found ? { ...key, color, selected: true } : key;
      })
    );

  Object.assign(state.layout, map);
};
