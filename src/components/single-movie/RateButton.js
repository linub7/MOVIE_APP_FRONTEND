const RateButton = ({ btnTitle }) => {
  return (
    <button
      className="text-highlight dark:text-highlight-dark hover:underline transition"
      type="button"
    >
      {btnTitle}
    </button>
  );
};

export default RateButton;
