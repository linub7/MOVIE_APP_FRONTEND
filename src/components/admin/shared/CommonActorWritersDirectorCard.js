import { useState } from 'react';
import CommonCardActions from './CommonCardActions';

const CommonActorWritersDirectorCard = ({
  actor = false,
  avatar,
  name,
  about,
  handleEdit,
  handleDelete,
}) => {
  const [activeBlur, setActiveBlur] = useState(false);
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-28 overflow-hidden">
      <div
        className="flex cursor-pointer relative"
        onMouseEnter={() => setActiveBlur(true)}
        onMouseLeave={() => setActiveBlur(false)}
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 h-28 aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-lg text-primary dark:text-white font-semibold ">
            {name}
          </h1>
          {actor && (
            <p className="text-primary dark:text-white text-sm">
              {about.substring(0, 50)}...
            </p>
          )}
        </div>
        {activeBlur && (
          <CommonCardActions
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default CommonActorWritersDirectorCard;
