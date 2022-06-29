const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1"
    />
  );
};

export default Submit;
