import { AuthContext } from 'context/AuthProvider';
import { MoviesContext } from 'context/MoviesProvider';
import { SearchCastContext } from 'context/SearchCastProvider';
import { SearchDirectorContext } from 'context/SearchDirectorProvider';
import { SearchWritersContext } from 'context/SearchWritersProvider';

import { ThemeContext } from 'context/ThemeProvider';
import { useContext } from 'react';

export const useTheme = () => useContext(ThemeContext);

export const useAuth = () => useContext(AuthContext);

export const useSearchDirector = () => useContext(SearchDirectorContext);
export const useSearchCast = () => useContext(SearchCastContext);
export const useSearchWriters = () => useContext(SearchWritersContext);

export const useMovies = () => useContext(MoviesContext);
