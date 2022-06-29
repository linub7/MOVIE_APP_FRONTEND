import { useNavigate } from 'react-router-dom';

const Footer = ({ leftText, leftPath, rightText, rightPath }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <p
        className="dark:text-dark-subtle text-light-subtle cursor-pointer dark:hover:text-white  hover:text-primary transition"
        onClick={() => navigate(leftPath)}
      >
        {leftText}
      </p>
      <p
        className="dark:text-dark-subtle text-light-subtle cursor-pointer dark:hover:text-white hover:text-primary transition"
        onClick={() => navigate(rightPath)}
      >
        {rightText}
      </p>
    </div>
  );
};

export default Footer;
