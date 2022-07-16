import React from 'react';
import MovieListItem from './MovieListItem';

const LatestUploads = ({
  posterUrl,
  title,
  genres,
  handleDeleteMovie,
  handleEdit,
  handleRedirect,
}) => {
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem
        poster={posterUrl}
        title={title}
        genres={genres}
        handleDelete={handleDeleteMovie}
        handleEdit={handleEdit}
        handleRedirect={handleRedirect}
      />
    </div>
  );
};

export default LatestUploads;
