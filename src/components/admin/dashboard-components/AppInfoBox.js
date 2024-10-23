import CountUp from 'react-countup';
const AppInfoBox = ({ title, quantity }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 h-14 w-14 md:h-24 md:w-24 flex items-center justify-center border-4 dark:border-yellow-400 border-cyan-400 rounded-full">
        <p className="text-base md:text-xl mb-2 text-primary dark:text-white">
          <CountUp end={quantity} />
        </p>
      </div>
      <h1 className="font-semibold text-base md:text-2xl mb-2 text-primary dark:text-white">
        {title.toLocaleString()}
      </h1>
    </div>
  );
};

export default AppInfoBox;
