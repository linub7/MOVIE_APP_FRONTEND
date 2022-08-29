const DWCResult = ({
  name,
  avatar,
  leadActor = false,
  handleClick = () => {},
}) => {
  return (
    <div className="flex justify-center items-center space-x-1">
      {/* {avatar && (
        <img src={avatar} alt={name} className="w-6 h-6 rounded-full" />
      )} */}
      <p
        onClick={handleClick}
        className={`text-highlight dark:text-highlight-dark text-xs sm:text-sm md:text-base hover:underline transition cursor-pointer lg:whitespace-nowrap ${
          leadActor ? 'font-bold' : ''
        }`}
      >
        {name}
      </p>
    </div>
  );
};

export default DWCResult;
