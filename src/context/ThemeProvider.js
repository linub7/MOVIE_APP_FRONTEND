import { createContext, useEffect } from 'react';

export const ThemeContext = createContext();

const defaultTheme = 'light';
const darkTheme = 'dark';

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    removeClass(oldTheme);
    addClass(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) {
      addClass(defaultTheme);
    } else {
      addClass(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => localStorage.getItem('theme');

const addClass = (className) =>
  document.documentElement.classList.add(className);
const removeClass = (className) =>
  document.documentElement.classList.remove(className);
