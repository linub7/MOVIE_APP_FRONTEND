import { commonPosterClasses } from 'utils/theme';

const PosterUI = ({ className, label }) => {
  return (
    <div className={`${commonPosterClasses} ${className}`}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  );
};

export default PosterUI;
