import { useNavigate } from 'react-router-dom';

const Footer = ({ leftText, leftPath, rightText, rightPath }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <p
        className="text-dark-subtle cursor-pointer hover:text-white transition"
        onClick={() => navigate(leftPath)}
      >
        {leftText}
      </p>
      <p
        className="text-dark-subtle cursor-pointer hover:text-white transition"
        onClick={() => navigate(rightPath)}
      >
        {rightText}
      </p>
    </div>
  );
};

export default Footer;
