import { commonInputClasses } from 'utils/theme';
import InputLabel from '../inputs/InputLabel';

const StoryLineInputComponent = ({ storyLine, setStoryLine }) => {
  return (
    <div>
      <InputLabel htmlFor={`storyLine`}>Story Line</InputLabel>
      <textarea
        id="storyLine"
        className={`${commonInputClasses} resize-none h-24 border-b-2 placeholder-opacity-25`}
        placeholder="When it's discovered that the evil Emperor Palpatine did not die at the hands of Darth Vader, the rebels must race against the clock to find out his whereabouts. Finn and Poe lead the Resistance to ..."
        value={storyLine}
        onChange={(e) => setStoryLine(e.target.value)}
      ></textarea>
    </div>
  );
};

export default StoryLineInputComponent;
