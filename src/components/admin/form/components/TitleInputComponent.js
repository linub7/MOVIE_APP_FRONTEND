import { commonInputClasses } from 'utils/theme';
import InputLabel from '../inputs/InputLabel';

const TitleInputComponent = ({ title, setTitle }) => {
  return (
    <div>
      <InputLabel htmlFor={'title'}>Title</InputLabel>
      <input
        id="title"
        type="text"
        className={`${commonInputClasses} border-b-2 font-semibold text-xl`}
        placeholder="Star Wars: The Rise of Skywalker"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default TitleInputComponent;
