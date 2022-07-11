export const validateMovie = ({
  title,
  storyLine,
  tags,
  director,
  writers,
  casts,
  releaseDate,
  poster,
  genres,
  type,
  language,
  status,
}) => {
  if (!title.trim()) return { error: 'title is required' };
  if (!storyLine.trim()) return { error: 'storyLine is required' };
  if (!tags.length) return { error: 'enter at least one tags' };
  if (director.id === undefined) return { error: 'Please select director ' };
  if (!writers.length) return { error: 'please select at least one writer' };
  if (!casts.length) return { error: 'please select at least one cast' };
  if (!releaseDate) return { error: 'please enter release date' };
  if (!poster) return { error: 'please enter a poster' };
  if (!genres.length) return { error: 'please select genres' };
  if (!type) return { error: 'please select movie type' };
  if (!language) return { error: 'please select language' };
  if (!status) return { error: 'please select movie status' };
  return { ok: true };
};
