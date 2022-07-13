const CreateButtonPopup = ({
  createModalRef,
  handleClickAddActor,
  handleClickAddMovie,
  handleClickAddWriter,
  handleClickAddDirector,
}) => {
  return (
    <div
      className="absolute right-0 top-12 animate-scale flex flex-col items-start space-y-5 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded z-20"
      ref={createModalRef}
    >
      <button
        onClick={handleClickAddMovie}
        className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition"
      >
        Add Movie
      </button>
      <button
        onClick={handleClickAddActor}
        className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition"
      >
        Add Actor
      </button>
      <button
        onClick={handleClickAddWriter}
        className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition"
      >
        Add Writer
      </button>
      <button
        onClick={handleClickAddDirector}
        className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition"
      >
        Add Director
      </button>
    </div>
  );
};

export default CreateButtonPopup;
