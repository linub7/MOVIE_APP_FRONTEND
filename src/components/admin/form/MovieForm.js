import { useState } from 'react';
import toast from 'react-hot-toast';
import { searchActor } from 'api/actor';
import {
  useAuth,
  useSearchCast,
  useSearchDirector,
  useSearchWriters,
} from 'hooks';
import { searchDirector } from 'api/director';
import { searchWriter } from 'api/writer';
import MovieFormLeftSide from './MovieFormLeftSide';
import MovieFormRightSide from './MovieFormRightSide';
import { validateMovie } from 'utils/validator';
import { uploadMovie } from 'api/movie';

const MovieForm = ({
  setToggleModal,
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
  director,
  setDirector,
  setTag,
  tag,
  tags,
  setTags,
  setTitle,
  title,
  setStoryLine,
  storyLine,
  setReleaseDate,
  releaseDate,
  setPoster,
  poster,
  setSelectedPosterForUI,
  selectedPosterForUI,
  setType,
  type,
  setLanguage,
  language,
  setStatus,
  status,
  setCast,
  cast,
  handleOptionSelect,
}) => {
  const [castValidation, setCastValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { ok, error } = validateMovie({
      title,
      storyLine,
      tags,
      director,
      writers,
      casts,
      releaseDate,
      poster,
      genres,
      type,
      language,
      status,
    });

    if (error) {
      return toast.error(error);
    }

    // casts, tags, genres, writers, trailer, director
    const formData = new FormData();
    formData.append('title', title);
    formData.append('storyLine', storyLine);
    formData.append('releaseDate', releaseDate);
    formData.append('type', type);
    formData.append('language', language);
    formData.append('status', status);
    formData.append('trailer', JSON.stringify(videoInfo));

    formData.append('tags', JSON.stringify(tags));
    formData.append('genres', JSON.stringify(genres));

    const finalCasts = casts.map((cast) => {
      return {
        actor: cast.profile.id,
        roleAs: cast.roleAs,
        leadActor: cast.leadActor,
      };
    });
    formData.append('cast', JSON.stringify(finalCasts));
    console.log(casts);
    console.log(finalCasts);

    if (writers.length) {
      const finalWriters = writers.map((writer) => writer.id);
      formData.append('writers', JSON.stringify(finalWriters));
    }
    if (director.id) formData.append('director', director.id);

    if (poster) formData.append('poster', poster);

    if (!videoInfo.url || !videoInfo.public_id)
      return toast.error('Please add a trailer');

    if (ok) {
      const { data, err } = await uploadMovie(auth?.token, formData);
      if (err) {
        setLoading(false);
        return toast.error(err);
      }
      toast.success('Movie uploaded successfully');
      setLoading(false);
      setTimeout(() => {
        setToggleModal(false);
      }, 2000);
    }

    resetDirectorSearch();
  };

  return (
    <div className="flex space-x-3 p-2">
      <div className="w-[70%] space-y-5">
        <MovieFormLeftSide
          loading={loading}
          title={title}
          setTitle={setTitle}
          storyLine={storyLine}
          setStoryLine={setStoryLine}
          tag={tag}
          setTag={setTag}
          tags={tags}
          setTags={setTags}
          handleAddTag={handleAddTag}
          handleTagChange={handleTagChange}
          handleRemoveTag={handleRemoveTag}
          searchDirectorResults={searchDirectorResults}
          director={director}
          handleChangeDirector={handleChangeDirector}
          setDirector={setDirector}
          handleDirector={handleDirector}
          writers={writers}
          setViewWritersPage={setViewWritersPage}
          handleChangeWriters={handleChangeWriters}
          handleAddWriters={handleAddWriters}
          searchWritersResults={searchWritersResults}
          casts={casts}
          setViewCastsPage={setViewCastsPage}
          resetDirectorSearch={resetDirectorSearch}
          searchCastResults={searchCastResults}
          handleChangeCast={handleChangeCast}
          cast={cast}
          setCast={setCast}
          setForceModalRender={setForceModalRender}
          setCastValidation={setCastValidation}
          handleSubmitCast={handleSubmitCast}
          releaseDate={releaseDate}
          setReleaseDate={setReleaseDate}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="w-[30%] mt-9 space-y-5">
        <MovieFormRightSide
          handleAddPoster={handleAddPoster}
          selectedPosterForUI={selectedPosterForUI}
          genres={genres}
          setShowSelectGenresModal={setShowSelectGenresModal}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
};

export default MovieForm;
