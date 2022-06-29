import { IoSunnySharp } from 'react-icons/io5';
import Container from './Container';
import { Link } from 'react-router-dom';
import { useTheme } from 'hooks';

const Navbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className={`p-2`}>
        <div className="flex items-center justify-between">
          <Link to={`/`}>
            <img src="/lgo.png" alt="logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-2">
            <li>
              <button
                className="dark:bg-white bg-dark-subtle p-1 rounded"
                onClick={toggleTheme}
              >
                <IoSunnySharp className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="Search..."
              />
            </li>
            <li className="text-white font-semibold text-lg">
              <Link to={'/auth/signin'}>LOGIN</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
