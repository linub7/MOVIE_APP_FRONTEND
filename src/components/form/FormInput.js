const FormInput = ({
  label,
  type,
  id,
  placeholder,
  value,
  name,
  handleChangeValue,
}) => {
  return (
    <div className="flex flex-col-reverse mb-3">
      <input
        value={value}
        name={name}
        onChange={handleChangeValue}
        type={type}
        id={id}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none p-1 dark:text-white dark:focus:border-white focus:border-primary transition peer"
        placeholder={placeholder}
      />
      <label
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-light-subtle transition self-start"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
