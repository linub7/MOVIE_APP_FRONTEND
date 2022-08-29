export const getPoster = (responsivePosters = []) => {
  const { length } = responsivePosters;
  if (!length) return null;
  // if poster has more than 2 items then selecting second one
  if (length > 2) return responsivePosters[1];

  // other wise the first one
  return responsivePosters[0];
};
