import Submit from 'components/form/Submit';
import CastsInputComponent from './components/CastsInputComponent';
import DirectorInputComponent from './components/DirectorInputComponent';
import ReleaseDateComponent from './components/ReleaseDateComponent';
import StoryLineInputComponent from './components/StoryLineInputComponent';
import TagsInputComponent from './components/TagsInputComponent';
import TitleInputComponent from './components/TitleInputComponent';
import WritersInputComponent from './components/WritersInputComponent';

const MovieFormLeftSide = ({
  title,
  setTitle,
  storyLine,
  setStoryLine,
  tag,
  setTag,
  tags,
  setTags,
  handleAddTag,
  handleTagChange,
  handleRemoveTag,
  searchDirectorResults,
  director,
  handleChangeDirector,
  setDirector,
  handleDirector,
  writers,
  setViewWritersPage,
  handleChangeWriters,
  handleAddWriters,
  searchWritersResults,
  casts,
  setViewCastsPage,
  resetDirectorSearch,
  searchCastResults,
  handleChangeCast,
  cast,
  setCast,
  setForceModalRender,
  setCastValidation,
  handleSubmitCast,
  releaseDate,
  setReleaseDate,
  handleSubmit,
}) => {
  return (
    <>
      <TitleInputComponent title={title} setTitle={setTitle} />

      <StoryLineInputComponent
        storyLine={storyLine}
        setStoryLine={setStoryLine}
      />

      <TagsInputComponent
        tags={tags}
        tag={tag}
        setTag={setTag}
        setTags={setTags}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        handleTagChange={handleTagChange}
      />

      <DirectorInputComponent
        director={director}
        handleChangeDirector={handleChangeDirector}
        handleDirector={handleDirector}
        searchDirectorResults={searchDirectorResults}
        setDirector={setDirector}
      />

      <WritersInputComponent
        handleAddWriters={handleAddWriters}
        handleChangeWriters={handleChangeWriters}
        searchWritersResults={searchWritersResults}
        setViewWritersPage={setViewWritersPage}
        writers={writers}
      />

      <CastsInputComponent
        casts={casts}
        setViewCastsPage={setViewCastsPage}
        resetDirectorSearch={resetDirectorSearch}
        searchCastResults={searchCastResults}
        handleChangeCast={handleChangeCast}
        setForceModalRender={setForceModalRender}
        cast={cast}
        setCast={setCast}
        setCastValidation={setCastValidation}
        handleSubmitCast={handleSubmitCast}
      />

      <ReleaseDateComponent
        releaseDate={releaseDate}
        setReleaseDate={setReleaseDate}
      />
      <Submit value={'Submit'} onSubmit={handleSubmit} type="button" />
    </>
  );
};

export default MovieFormLeftSide;
