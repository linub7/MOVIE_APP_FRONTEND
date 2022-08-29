const CastComponent = ({ cast }) => {
  return (
    // grid grid-cols-10  ml-2 space-x-5
    <div className="flex flex-wrap space-x-4 space-y-3 text-center">
      {cast?.map((el) => (
        <div
          key={el._id}
          className="basis-28 flex flex-col items-center cursor-pointer"
        >
          <img
            className="h-24 w-24 aspect-square object-cover rounded-full"
            src={el.profile?.avatar}
            alt={el.profile?.name}
          />

          <p className="dark:text-highlight-dark text-xs md:text-sm lg:text-base text-highlight hover:underline">
            {el.profile?.name}
          </p>
          <p className="text-light-subtle hidden md:inline-grid dark:text-dark-subtle hover:underline">
            <span className="italic text-primary dark:text-white text-sm">
              as
            </span>{' '}
            {el.roleAs}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CastComponent;
