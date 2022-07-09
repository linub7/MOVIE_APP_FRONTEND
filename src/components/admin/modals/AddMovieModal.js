import { useEffect, useState } from 'react';
import GenresModalContent from '../form/genres/GenresModalContent';
import MovieForm from '../form/MovieForm';
import TrailerSelector from '../shared/TrailerSelector';
import CastsModal from './CastsModal';
import CommonModal from './CommonModal';
import GenresModal from './GenresModal';
import WritersModal from './WritersModal';

const AddMovieModal = ({
  setShowAddMovieModal,
  handleChange,
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
        {/* {!videoSelected && (
        <TrailerSelector
          handleChange={handleChange}
          handleTypeError={handleTypeError}
          progressBarRef={progressBarRef}
        />
      )} */}

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
            // setWritersList={setWritersList}
            writers={writers}
            setWriters={setWriters}
            setViewCastsPage={setViewCastsPage}
            casts={casts}
            setCasts={setCasts}
            setShowSelectGenresModal={setShowSelectGenresModal}
            showSelectGenresModal={showSelectGenresModal}
            genres={genres}
            setGenres={setGenres}
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
    </CommonModal>
    // <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
    //   <div className="dark:bg-primary bg-white rounded w-[45rem] h-[30rem] overflow-auto relative scrollbar p-2">
    //     <button
    //       className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
    //       onClick={() => {
    //         setShowAddMovieModal(false);
    //         setVideoSelected(false);
    //       }}
    //     >
    //       <IoCloseCircleOutline size={30} className="fixed" />
    //     </button>
    //   </div>
    // </div>
  );
};

export default AddMovieModal;
