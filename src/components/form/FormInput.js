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
        className="bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none p-1 text-white focus:border-white transition peer"
        placeholder={placeholder}
      />
      <label
        className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
