const DWCResult = ({ name, avatar }) => {
  return (
    <div className="flex justify-center items-center space-x-1">
      {avatar && (
        <img src={avatar} alt={name} className="w-6 h-6 rounded-full" />
      )}
      <p className="text-highlight dark:text-highlight-dark hover:underline transition cursor-pointer">
        {name}
      </p>
    </div>
  );
};

export default DWCResult;
