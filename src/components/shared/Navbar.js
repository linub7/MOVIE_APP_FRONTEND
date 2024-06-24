import Container from './Container';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from 'hooks';
import Cookies from 'js-cookie';
import ToggleThemeButton from './ToggleThemeButton';
import AppSearchForm from 'components/admin/shared/AppSearchForm';
import { useState } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleTheme } = useTheme();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('auth');
    setAuth({
      user: null,
      token: '',
    });
    window.location.href = '/auth/signin';
  };

  const handleResetSearch = () => setSearchTerm('');

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm === '') return;
    navigate(`/movie/search`, { state: searchTerm });
    handleResetSearch();
  };

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className={`p-2`}>
        <div className="flex items-center justify-between">
          <Link to={`/`}>
            <img src="/lgo.png" alt="logo" className="h-8  sm:h-10" />
          </Link>
          <ul className="flex items-center space-x-2">
            <li>
              <ToggleThemeButton toggleTheme={toggleTheme} />
            </li>
            <li>
              <AppSearchForm
                placeholder={'Search Movies'}
                inputClassStyle={
                  'border-dark-subtle text-white focus:border-white sm:w-auto w-40'
                }
                iconClassStyle={'text-white focus:text-white'}
                value={searchTerm}
                setValue={setSearchTerm}
                handleResetSearchResults={handleResetSearch}
                handleSubmitSearch={handleSubmitSearch}
              />
            </li>
            {auth?.token ? (
              <li className="text-white font-semibold text-base md:text-lg hover:text-yellow-400">
                {/* <Link to={'/auth/signin'}>LOGIN</Link> */}
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="text-white font-semibold text-base md:text-lg hover:text-yellow-400">
                <Link to={'/auth/signin'}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
