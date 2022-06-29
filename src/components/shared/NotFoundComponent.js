import { Link } from 'react-router-dom';

const NotFoundComponent = () => {
  return (
    <div className="flex items-center p-6 max-w-sm rounded-lg mx-auto shadow-lg space-x-4 mt-24">
      <img className="w-12 h-12" src="/404.jpg" alt="" />
      <div>
        <div className="text-lg font-medium text-black">Page not Found</div>
        <Link to={'/'}>Back to home</Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
