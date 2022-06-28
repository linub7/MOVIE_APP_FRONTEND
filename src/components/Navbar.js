import { IoSunnySharp } from 'react-icons/io5';

const Navbar = () => {
  return (
    <div className="bg-secondary">
      <div className="text-white max-w-screen-xl mx-auto p-2">
        <div className="flex items-center justify-between">
          <img src="./logo.png" alt="logo" className="h-10" />
          <ul className="flex items-center space-x-2">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
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
            <li className="text-white font-semibold text-lg">LOGIN</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
