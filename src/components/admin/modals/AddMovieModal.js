import { useEffect, useState } from 'react';
import GenresModalContent from '../form/genres/GenresModalContent';
import MovieForm from '../form/MovieForm';
import TrailerSelector from '../shared/TrailerSelector';
import CastsModal from './CastsModal';
import CommonModal from './CommonModal';
import GenresModal from './GenresModal';
import WritersModal from './WritersModal';

const AddMovieModal = ({
  setToggleModal,
  setShowAddMovieModal,
  handleChangeTrailer,
  handleTypeError,
  videoSelected,
  progressBarRef,
  setVideoSelected,
  videoInfo,
}) => {
  const [forceModalRender, setForceModalRender] = useState(false);
  const [showSelectGenresModal, setShowSelectGenresModal] = useState(false);
  const [viewWritersPage, setViewWritersPage] = useState(false);
  const [viewCastsPage, setViewCastsPage] = useState(false);
  const [director, setDirector] = useState({});
  const [writers, setWriters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [casts, setCasts] = useState([]);
  const [title, setTitle] = useState('');
  const [storyLine, setStoryLine] = useState('');
  const [cast, setCast] = useState({
    profile: {},
    roleAs: '',
    leadActor: false,
  });
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState(null);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');
  const [type, setType] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    return () => {
      setVideoSelected(false);
    };
  }, []);

  useEffect(() => {
    console.log('modal re-render');
  }, [forceModalRender]);

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

  const handleRemoveWriter = (id) => {
    setWriters(writers.filter((writer) => writer.id !== id));
  };

  const handleRemoveCast = (id) => {
    // setWriters(writers.filter((writer) => writer.id !== id));
    setCasts(casts.filter((cast) => cast.profile?.id !== id));
  };

  const handleAddGenres = (genre) => {
    if (genres.includes(genre)) return;
    setGenres([...genres, genre]);
  };

  const handleRemoveGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  return (
    <CommonModal
      // setWritersList={setWritersList}
      setWriters={setWriters}
      viewCastsPage={viewCastsPage}
      setShowAddMovieModal={setShowAddMovieModal}
      setVideoSelected={setVideoSelected}
      viewWritersPage={viewWritersPage}
      setViewWritersPage={setViewWritersPage}
      setViewCastsPage={setViewCastsPage}
    >
      <>
        {!videoSelected ? (
          <TrailerSelector
            handleChangeTrailer={handleChangeTrailer}
            handleTypeError={handleTypeError}
            progressBarRef={progressBarRef}
          />
        ) : (
          <>
            {viewWritersPage ? (
              <div className="space-y-2">
                <WritersModal
                  setWriters={setWriters}
                  writers={writers}
                  handleRemoveWriter={handleRemoveWriter}
                  setViewWritersPage={setViewWritersPage}
                />
              </div>
            ) : viewCastsPage ? (
              <div className="space-y-2">
                <CastsModal
                  casts={casts}
                  handleRemoveCast={handleRemoveCast}
                  setViewCastsPage={setViewCastsPage}
                />
              </div>
            ) : (
              <MovieForm
                setToggleModal={setToggleModal}
                cast={cast}
                setCast={setCast}
                language={language}
                setLanguage={setLanguage}
                poster={poster}
                setPoster={setPoster}
                selectedPosterForUI={selectedPosterForUI}
                setSelectedPosterForUI={setSelectedPosterForUI}
                status={status}
                setStatus={setStatus}
                tag={tag}
                setTag={setTag}
                tags={tags}
                setTags={setTags}
                title={title}
                setTitle={setTitle}
                storyLine={storyLine}
                setStoryLine={setStoryLine}
                type={type}
                setType={setType}
                releaseDate={releaseDate}
                setReleaseDate={setReleaseDate}
                setViewWritersPage={setViewWritersPage}
                setForceModalRender={setForceModalRender}
                videoInfo={videoInfo}
                director={director}
                setDirector={setDirector}
                writers={writers}
                setWriters={setWriters}
                setViewCastsPage={setViewCastsPage}
                casts={casts}
                setCasts={setCasts}
                setShowSelectGenresModal={setShowSelectGenresModal}
                showSelectGenresModal={showSelectGenresModal}
                genres={genres}
                setGenres={setGenres}
                handleOptionSelect={handleOptionSelect}
              />
            )}
            {showSelectGenresModal && (
              <GenresModal
                setShowSelectGenresModal={setShowSelectGenresModal}
                showSelectGenresModal={showSelectGenresModal}
              >
                <GenresModalContent
                  handleAddGenres={handleAddGenres}
                  handleRemoveGenre={handleRemoveGenre}
                  genres={genres}
                />
              </GenresModal>
            )}
          </>
        )}
      </>
    </CommonModal>
  );
};

export default AddMovieModal;
