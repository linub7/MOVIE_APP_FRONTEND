import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import { BiMoviePlay } from 'react-icons/bi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaPenNib, FaUserSecret, FaUserTie } from 'react-icons/fa';
import { useAuth } from 'hooks';
import Cookies from 'js-cookie';

const AdminDashboardComponent = () => {
  const location = useLocation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: '',
    });

    Cookies.remove('auth');

    navigate('/');
  };
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300">
      <div className="flex flex-col justify-between pl-5 space-y-2 sticky top-0 h-screen">
        <ul>
          <li>
            <Link to={'/'}>
              <img src="/lgo.png" alt="logo" className="h-14 p-2" />
            </Link>
          </li>

          <li>
            <NavItem
              isActive={location.pathname === '/admin/dashboard' ? true : false}
              path={'/admin/dashboard'}
            >
              <IoHomeOutline />
              <span>Dashboard</span>
            </NavItem>
          </li>
          <li>
            <NavItem
              isActive={location.pathname === '/admin/movies' ? true : false}
              path={'/admin/movies'}
            >
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem
              isActive={location.pathname === '/admin/actors' ? true : false}
              path={'/admin/actors'}
            >
              <FaUserTie />
              <span>Actors</span>
            </NavItem>
          </li>
          <li>
            <NavItem
              isActive={location.pathname === '/admin/writers' ? true : false}
              path={'/admin/writers'}
            >
              <FaPenNib />
              <span>Writers</span>
            </NavItem>
          </li>
          <li>
            <NavItem
              isActive={location.pathname === '/admin/directors' ? true : false}
              path={'/admin/directors'}
            >
              <FaUserSecret />
              <span>Directors</span>
            </NavItem>
          </li>

          {/* <li></li> */}
        </ul>
        <div>
          <div className="h-0.5 bg-white"></div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2  font-semibold text-lg text-gray-400 hover:text-yellow-400"
          >
            <IoLogOutOutline />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ path, children, isActive }) => {
  const commonClass =
    'flex items-center space-x-2 p-2 font-semibold text-lg hover:text-yellow-400';
  return (
    <NavLink
      // className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400')}
      className={
        isActive ? `text-white ${commonClass}` : `text-gray-400 ${commonClass}`
      }
      to={path}
    >
      {children}
    </NavLink>
  );
};

export default AdminDashboardComponent;
