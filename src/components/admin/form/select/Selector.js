const Selector = ({ name, value, handleOptionSelect, label, options }) => {
  return (
    <select
      className="border-2 dark:border-dark-subtle border-light-subtle p-1 pr-10  focus:border-primary transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary"
      id={name}
      name={name}
      value={value}
      onChange={handleOptionSelect}
    >
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Selector;
