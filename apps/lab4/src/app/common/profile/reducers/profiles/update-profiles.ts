export const UpdateProfiles = (state, profile: Profile) => {
  const updated = state.map((p) => (p.id === profile.id ? profile : p));

  if (updated.length === 0) updated.push(profile);

  Object.assign(state, updated);
};
