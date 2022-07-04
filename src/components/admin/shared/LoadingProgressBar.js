import LoadingBar from 'react-top-loading-bar';

const LoadingProgressBar = ({ progressBarRef }) => {
  const theme = localStorage.getItem('theme');
  const loadingBarBgColor = theme === 'dark' ? '#facc15d9' : '#22d3eed9';
  return (
    <LoadingBar
      ref={progressBarRef}
      style={{ backgroundColor: `${loadingBarBgColor}`, height: '11px' }}
    />
  );
};

export default LoadingProgressBar;
