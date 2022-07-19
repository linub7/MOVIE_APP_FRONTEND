export const convertReviewCount = (count) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + 'K';
};
