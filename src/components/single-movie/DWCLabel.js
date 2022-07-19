const DWCLabel = ({ label, className = '' }) => {
  return (
    <p
      className={`text-light-subtle dark:text-dark-subtle font-semibold ${className}`}
    >
      {label}:
    </p>
  );
};

export default DWCLabel;
