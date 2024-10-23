import { searchActor } from 'api/actor';
import { searchDirector } from 'api/director';
import { updateMovieWithPoster } from 'api/movie';
import { searchWriter } from 'api/writer';
import GenresModalContent from 'components/admin/form/genres/GenresModalContent';
import MovieFormLeftSide from 'components/admin/form/MovieFormLeftSide';
import MovieFormRightSide from 'components/admin/form/MovieFormRightSide';
import AdminLayout from 'components/admin/layout/AdminLayout';
import CastsModal from 'components/admin/modals/CastsModal';
import CommonUpdateModal from 'components/admin/modals/CommonUpdateModal';
import GenresModal from 'components/admin/modals/GenresModal';
import WritersModal from 'components/admin/modals/WritersModal';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import {
  useAuth,
  useSearchCast,
  useSearchDirector,
  useSearchWriters,
} from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateUpdateMovie } from 'utils/validator';

const AdminEditMovie = ({
  toggleModal,
  setToggleModal,
  setShowAddMovieModal,
  setShowAddActorModal,
  handleOptionSelect,
}) => {
  const { state } = useLocation();
  const [videoInfo, setVideoInfo] = useState(null);
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

  const movie = state?.movie;

  const navigate = useNavigate();
  const progressBarRef = useRef(null);

  useEffect(() => {
    setTitle(movie?.title);
    setStoryLine(movie?.storyLine);
    setTags(movie?.tags);
    setReleaseDate(new Date(movie?.releaseDate).toISOString().split('T')[0]);
    setDirector(movie?.director);
    // setPoster(movie?.poster);
    setSelectedPosterForUI(movie?.poster?.url);
    setType(movie?.type);
    setLanguage(movie?.language);
    setStatus(movie?.status);
    setGenres(movie?.genres);
    setVideoInfo(movie?.trailer);
    setWriters(
      movie?.writers?.map((writer) => ({
        name: writer?.name,
        avatar: writer?.avatar?.url,
        id: writer?._id,
        createdAt: writer?.createdAt,
      }))
    );
    setCasts(
      movie?.cast?.map((cast) => ({
        leadActor: cast?.leadActor,
        roleAs: cast?.roleAs,
        profile: {
          id: cast?.actor?._id,
          avatar: cast?.actor?.avatar?.url,
          name: cast?.actor?.name,
        },
      }))
    );
  }, [movie]);

  const [castValidation, setCastValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const { handleDirectorSearch, searchDirectorResults, resetDirectorSearch } =
    useSearchDirector();

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

  const handleRemoveWriter = (id) => {
    setWriters(writers.filter((writer) => writer.id !== id));
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

  const handleAddGenres = (genre) => {
    if (genres.includes(genre)) return;
    setGenres([...genres, genre]);
  };

  const handleRemoveGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  const handleRemoveCast = (id) => {
    // setWriters(writers.filter((writer) => writer.id !== id));
    setCasts(casts.filter((cast) => cast.profile?.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { ok, error } = validateUpdateMovie({
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
      setLoading(false);
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

    const finalCasts = casts?.map((cast) => {
      return {
        actor: cast.profile.id,
        roleAs: cast.roleAs,
        leadActor: cast.leadActor,
      };
    });
    formData.append('cast', JSON.stringify(finalCasts));

    if (writers.length) {
      const finalWriters = writers?.map((writer) => writer.id);
      formData.append('writers', JSON.stringify(finalWriters));
    }
    if (director.id) formData.append('director', director.id);

    if (poster) {
      formData.append('poster', poster);
    }

    if (!videoInfo.url || !videoInfo.public_id)
      return toast.error('Please add a trailer');

    if (ok) {
      progressBarRef.current.continuousStart();

      const { err } = await updateMovieWithPoster(
        auth?.token,
        movie._id,
        formData
      );
      if (err) {
        progressBarRef.current.complete();
        setLoading(false);
        return toast.error(err);
      }
      toast.success('Movie uploaded successfully');
      progressBarRef.current.complete();
      setLoading(false);
      setTimeout(() => {
        navigate('/admin/movies');
      }, 2000);
    }
  };

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      <LoadingProgressBar progressBarRef={progressBarRef} />
      <div className="flex space-x-3 p-2">
        {viewWritersPage ? (
          <div className="space-y-2">
            <CommonUpdateModal setShowWritersModal={setViewWritersPage}>
              <WritersModal
                setWriters={setWriters}
                writers={writers}
                handleRemoveWriter={handleRemoveWriter}
                setViewWritersPage={setViewWritersPage}
              />
            </CommonUpdateModal>
          </div>
        ) : viewCastsPage ? (
          <div className="space-y-2">
            <CommonUpdateModal setShowWritersModal={setViewCastsPage}>
              <CastsModal
                casts={casts}
                handleRemoveCast={handleRemoveCast}
                setViewCastsPage={setViewCastsPage}
              />
            </CommonUpdateModal>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
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
    </AdminLayout>
  );
};

export default AdminEditMovie;
