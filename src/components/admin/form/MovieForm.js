import { useState } from 'react';
import { commonInputClasses } from 'utils/theme';
import InputLabel from './InputLabel';
import TagsInput from './TagsInput';

const MovieForm = ({ videoInfo }) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    if (e.target.value !== ',') setTag(e.target.value);
  };

  const handleAddTag = ({ key }) => {
    if (key === 'Enter' || key === ',') {
      if (!tag) return;
      if (tags.includes(tag)) return setTag('');
      setTags([...tags, tag]);
      setTag('');
    }
    if (key === 'Backspace' && tags.length) {
      if (!tag) {
        const newTags = tags.filter((_, index) => index !== tags.length - 1);
        setTags([...newTags]);
      }
    }
  };

  const handleRemoveTag = (tagName) => {
    const newTags = tags.filter((tag) => tag !== tagName);
    setTags([...newTags]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-[70%] h-5 space-y-4">
        <div>
          <InputLabel htmlFor={'title'}>Title</InputLabel>
          <input
            id="title"
            type="text"
            className={`${commonInputClasses} border-b-2 font-semibold text-xl`}
            placeholder="Star Wars: The Rise of Skywalker"
          />
        </div>

        <div>
          <InputLabel htmlFor={`storyLine`}>Story Line</InputLabel>
          <textarea
            id="storyLine"
            className={`${commonInputClasses} resize-none h-24 border-b-2 placeholder-opacity-25`}
            placeholder="When it's discovered that the evil Emperor Palpatine did not die at the hands of Darth Vader, the rebels must race against the clock to find out his whereabouts. Finn and Poe lead the Resistance to ..."
          ></textarea>
        </div>
        <div>
          <InputLabel htmlFor={`tags`}>Tags</InputLabel>
          <TagsInput
            tag={tag}
            setTag={setTag}
            tags={tags}
            setTags={setTags}
            handleAddTag={handleAddTag}
            handleTagChange={handleTagChange}
            handleRemoveTag={handleRemoveTag}
          />
        </div>
      </div>

      <div className="w-[30%] h-5 bg-blue-400"></div>
    </form>
  );
};

export default MovieForm;
