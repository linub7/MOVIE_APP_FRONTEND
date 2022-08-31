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
    <div className="">
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
