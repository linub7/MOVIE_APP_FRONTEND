import InputLabel from './InputLabel';

const InputLabelWithBadge = ({ children, htmlFor, badge }) => {
  return (
    // <label
    //   htmlFor={htmlFor}
    //   className="dark:text-dark-subtle text-light-subtle font-semibold"
    // >
    //   {children}
    // </label>
    <div className="relative">
      <InputLabel htmlFor={htmlFor}>{children}</InputLabel>
      <span className="bg-red-500 absolute -top-2 -right-4 w-5 h-5 rounded-full flex items-center justify-center text-white">
        {badge < 10 ? badge : '9+'}
      </span>
    </div>
  );
};

export default InputLabelWithBadge;
