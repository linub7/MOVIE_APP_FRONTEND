export const addRatingValidation = ({ rate, content }) => {
  if (!content.trim()) return { ok: false, error: 'Content is required' };
  if (content.length < 3)
    return { ok: false, error: 'Content must be at least 6 characters' };

  if (!rate) return { ok: false, error: 'Rate is required' };

  return { ok: true };
};
