let timeoutId;
export const debounce = (fn, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};
