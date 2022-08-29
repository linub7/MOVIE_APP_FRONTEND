const RateButton = ({ btnTitle, handleClickButton }) => {
  return (
    <button
      onClick={handleClickButton}
      className="text-sm md:text-base text-highlight dark:text-highlight-dark hover:underline transition"
      type="button"
    >
      {btnTitle}
    </button>
  );
};

export default RateButton;
