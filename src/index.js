import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from 'context/ThemeProvider';
import AuthProvider from 'context/AuthProvider';
import SearchDirectorProvider from 'context/SearchDirectorProvider';
import SearchCastProvider from 'context/SearchCastProvider';
import SearchWritersProvider from 'context/SearchWritersProvider';
import MoviesProvider from 'context/MoviesProvider';
import ScrollToTop from 'scroll/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <SearchDirectorProvider>
        <SearchCastProvider>
          <SearchWritersProvider>
            <ThemeProvider>
              <AuthProvider>
                <MoviesProvider>
                  <ScrollToTop />
                  <App />
                </MoviesProvider>
              </AuthProvider>
            </ThemeProvider>
          </SearchWritersProvider>
        </SearchCastProvider>
      </SearchDirectorProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
