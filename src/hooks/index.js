import { AuthContext } from 'context/AuthProvider';
const { ThemeContext } = require('context/ThemeProvider');
const { useContext } = require('react');

export const useTheme = () => useContext(ThemeContext);

export const useAuth = () => useContext(AuthContext);
