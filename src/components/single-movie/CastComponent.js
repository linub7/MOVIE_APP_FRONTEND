const CastComponent = ({ cast }) => {
  return (
    <div className="grid grid-cols-10 gap-3">
      {cast?.map((el) => (
        <div key={el._id} className="flex flex-col items-center cursor-pointer">
          <img
            className="w-24 h-24 aspect-square object-cover rounded-full"
            src={el.profile?.avatar}
            alt={el.profile?.name}
          />

          <p className="dark:text-highlight-dark text-highlight hover:underline">
            {el.profile?.name}
          </p>
          <p className="text-light-subtle dark:text-dark-subtle hover:underline">
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
