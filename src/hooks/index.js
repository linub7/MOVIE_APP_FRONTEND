const { ThemeContext } = require('context/ThemeProvider');
const { useContext } = require('react');

export const useTheme = () => useContext(ThemeContext);
