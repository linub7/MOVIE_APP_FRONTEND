import Submit from 'components/form/Submit';
import { useState } from 'react';
import { commonInputClasses } from 'utils/theme';
import InputLabel from './InputLabel';
import LiveSearch from './LiveSearch';
import TagsInput from './TagsInput';
import { results } from 'data/fakeData';
import toast from 'react-hot-toast';
import LiveWritersSearch from './LiveWritersSearch';
import InputLabelWithBadge from './InputLabelWithBadge';
import CastForm from './CastForm';

const MovieForm = ({
  videoInfo,
  setViewWritersPage,
  writers,
  setWriters,
  setViewCastsPage,
  casts,
  setCasts,
}) => {
  const [title, setTitle] = useState('');
  const [storyLine, setStoryLine] = useState('');
  // const [profile, setProfile] = useState({});
  const [cast, setCast] = useState({
    profile: {},
    roleAs: '',
    leadActor: false,
  });

  const [castValidation, setCastValidation] = useState(false);
  const [director, setDirector] = useState([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState(null);
  const [genres, setGenres] = useState([]);
  const [type, setType] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState('');
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

  const handleAddWriters = (profile) => {
    for (const writer of writers) {
      if (writer.id === profile.id) return toast.error('Writer already added');
    }
    setWriters([...writers, profile]);
  };

  const handleRemoveTag = (tagName) => {
    const newTags = tags.filter((tag) => tag !== tagName);
    setTags([...newTags]);
  };

  const handleSubmitCast = (cast) => {
    setCasts([...casts, cast]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!castValidation) return toast.error('Please add at least one cast');
    if (castValidation) {
      console.log({ title, storyLine, tags, director, writers, casts });
    }
  };

  return (
    <div className="flex space-x-3 p-2">
      <div className="w-[70%] h-5 space-y-4">
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

        <div>
          <InputLabel htmlFor={'director'}>Director</InputLabel>
          <LiveSearch
            profile={director}
            setProfile={(e) => setDirector(e)}
            results={results}
            name="director"
          />
        </div>
        <div>
          <div className="flex justify-between dark:text-white text-primary transition">
            <InputLabelWithBadge badge={writers?.length} htmlFor={'Writers'}>
              Writers
            </InputLabelWithBadge>
            {writers.length > 0 && (
              <button
                type="button"
                onClick={() => setViewWritersPage(true)}
                className="hover:underline"
              >
                View All
              </button>
            )}
          </div>
          <LiveWritersSearch
            profile={writers}
            setProfile={(e) => handleAddWriters(e)}
            results={results}
            name="writers"
          />
        </div>
        <div>
          <div className="flex justify-between dark:text-white text-primary transition">
            <InputLabelWithBadge badge={casts.length}>
              Add Cast & Crew
            </InputLabelWithBadge>
            {casts.length > 0 && (
              <button
                type="button"
                onClick={() => setViewCastsPage(true)}
                className="hover:underline"
              >
                View All
              </button>
            )}
          </div>
          <CastForm
            cast={cast}
            setCast={setCast}
            results={results}
            setCastValidation={setCastValidation}
            handleSubmitCast={handleSubmitCast}
            casts={casts}
          />
        </div>
        {/* <div>
          <InputLabel htmlFor={'Profile'} />
          <LiveSearch
            profile={profile}
            setProfile={setProfile}
            results={results}
            name="profile"
          />
        </div> */}

        <Submit value={'Submit'} onSubmit={handleSubmit} type="button" />
      </div>

      <div className="w-[30%] h-5 bg-blue-400"></div>
    </div>
  );
};

export default MovieForm;
