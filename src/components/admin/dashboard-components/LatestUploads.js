import React from 'react';
import MovieListItem from './MovieListItem';

const LatestUploads = () => {
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem
        poster={
          'https://images.unsplash.com/photo-1657560144540-b41eb30acdac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        }
        title={'Lorem ipsum dolor sit amet.'}
        genres={['Action', 'Adventure', 'Fantasy']}
        handleDelete={() => {}}
        handleEdit={() => {}}
        handleRedirect={() => {}}
      />
    </div>
  );
};

export default LatestUploads;
