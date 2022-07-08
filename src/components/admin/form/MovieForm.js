import Submit from 'components/form/Submit';
import { useState } from 'react';
import { commonInputClasses } from 'utils/theme';
import InputLabel from './inputs/InputLabel';
import LiveSearch from './search/LiveSearch';
import TagsInput from './tag/TagsInput';
// import { results } from 'data/fakeData';
import toast from 'react-hot-toast';
import LiveWritersSearch from './search/LiveWritersSearch';
import InputLabelWithBadge from './inputs/InputLabelWithBadge';
import CastForm from './cast/CastForm';
import PosterSelector from './poster/PosterSelector';
import GenresSelector from './genres/GenresSelector';
import Selector from './select/Selector';
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from 'utils/selectorOptions';
import { searchActor } from 'api/actor';
import { useSearchCast, useSearchDirector, useSearchWriters } from 'hooks';
import { searchDirector } from 'api/director';
import { searchWriter } from 'api/writer';

const MovieForm = ({
  videoInfo,
  setViewWritersPage,
  writers,
  setWriters,
  setViewCastsPage,
  casts,
  setCasts,
  showSelectGenresModal,
  setShowSelectGenresModal,
  genres,
  setGenres,
  setForceModalRender,
}) => {
  const [title, setTitle] = useState('');
  const [storyLine, setStoryLine] = useState('');
  const [cast, setCast] = useState({
    profile: {},
    roleAs: '',
    leadActor: false,
  });
  const [castValidation, setCastValidation] = useState(false);
  const [director, setDirector] = useState({});
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState(null);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');
  const [type, setType] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const {
    handleDirectorSearch,
    searchingDirector,
    searchDirectorResultsNotFound,
    searchDirectorResults,
    resetDirectorSearch,
  } = useSearchDirector();

  const {
    handleWritersSearch,
    // searchingWriters,
    // searchWritersResultsNotFound,
    searchWritersResults,
  } = useSearchWriters();

  const {
    handleCastSearch,
    // searchingCast,
    // searchCastResultsNotFound,
    searchCastResults,
  } = useSearchCast();

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

  const handleAddWriters = (input) => {
    for (const writer of writers) {
      if (writer.id === input.id) return toast.error('Writer already added');
    }
    setWriters([...writers, input]);
  };

  console.log(director);

  const handleRemoveTag = (tagName) => {
    const newTags = tags.filter((tag) => tag !== tagName);
    setTags([...newTags]);
  };

  const handleSubmitCast = (input) => {
    setCasts([...casts, input]);
    setForceModalRender((prev) => !prev);
    setCast({
      profile: {},
      roleAs: '',
      leadActor: false,
    });
  };

  const updatePosterForUI = (poster) => {
    const url = URL.createObjectURL(poster);
    setSelectedPosterForUI(url);
  };

  const handleAddPoster = (e) => {
    if (!e.target.files[0].type.startsWith('image'))
      return toast.error('Invalid file type');

    const file = e.target.files[0];
    updatePosterForUI(file);
    setPoster(file);
  };

  const handleOptionSelect = ({ target }) => {
    const { name, value } = target;
    if (name === 'type') {
      setType(value);
    }
    if (name === 'language') {
      setLanguage(value);
    }

    if (name === 'status') {
      setStatus(value);
    }
  };

  const handleChangeDirector = (e) => {
    setDirector({ ...director, name: e.target.value });
    handleDirectorSearch(searchDirector, e.target.value);
  };

  const handleChangeWriters = (e) => {
    // setWriters([...writers, { name: e.target.value }]);
    handleWritersSearch(searchWriter, e.target.value);
  };

  const handleChangeCast = (e) => {
    setCast({ ...cast, name: e.target.value });
    handleCastSearch(searchActor, e.target.value);
  };

  const handleDirector = (result) => setDirector(result);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!casts.length) return toast.error('Please add at least one cast');

    console.log({
      title,
      storyLine,
      tags,
      director,
      writers,
      casts,
      releaseDate,
      genres,
      type,
      language,
      status,
      poster,
    });

    resetDirectorSearch();
  };

  return (
    <div className="flex space-x-3 p-2">
      <div className="w-[70%] space-y-5">
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
            visible={searchDirectorResults.length}
            value={director?.name}
            onChange={handleChangeDirector}
            setValue={setDirector}
            profile={director}
            onSelect={handleDirector}
            results={searchDirectorResults}
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
            value={writers?.name}
            onChange={handleChangeWriters}
            onSelect={(e) => handleAddWriters(e)}
            results={searchWritersResults}
            name="writers"
            visible={searchWritersResults.length}
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
                onClick={() => {
                  setViewCastsPage(true);
                  resetDirectorSearch();
                }}
                className="hover:underline"
              >
                View All
              </button>
            )}
          </div>
          <CastForm
            visible={searchCastResults.length}
            onChange={handleChangeCast}
            setForceModalRender={setForceModalRender}
            cast={cast}
            setCast={setCast}
            results={searchCastResults}
            setCastValidation={setCastValidation}
            handleSubmitCast={handleSubmitCast}
            casts={casts}
          />
        </div>

        <input
          value={releaseDate}
          type="date"
          className={`${commonInputClasses} border-2 rounded p-1 w-auto`}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <Submit value={'Submit'} onSubmit={handleSubmit} type="button" />
      </div>

      <div className="w-[30%] mt-9 space-y-5">
        <PosterSelector
          label={'Select Poster'}
          name="poster"
          handleAddPoster={handleAddPoster}
          selectedPosterForUI={selectedPosterForUI}
        />

        <GenresSelector
          badge={genres.length}
          setShowSelectGenresModal={setShowSelectGenresModal}
        />

        <Selector
          label={'Type'}
          name="type"
          options={typeOptions}
          handleOptionSelect={handleOptionSelect}
        />
        <Selector
          label={'Language'}
          name="language"
          options={languageOptions}
          handleOptionSelect={handleOptionSelect}
        />
        <Selector
          label={'Status'}
          name="status"
          options={statusOptions}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
};

export default MovieForm;
