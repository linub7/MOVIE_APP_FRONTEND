import CountTo from 'react-count-to';
const AppInfoBox = ({ title, quantity }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 h-24 w-24 flex items-center justify-center border-4 dark:border-yellow-400 border-cyan-400 rounded-full">
        <p className="text-xl mb-2 text-primary dark:text-white">
          <CountTo to={quantity} speed={quantity * 100} />
        </p>
      </div>
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        {title.toLocaleString()}
      </h1>
    </div>
  );
};

export default AppInfoBox;
