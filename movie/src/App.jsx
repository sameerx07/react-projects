import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WebMovies() {
  const [search, setSearch] = useState("");
  const [popular, setPopular] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`)
      .then((res) => {
        setPopular(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (search) {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=cfe422613b250f702980a3bbf9e90716`)
        .then((res) => {
          setSearchedMovie(res.data.results);
        });
    }
  }, [search]);

  return (
    <div className='bg-stone-600 p-5 min-h-screen'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl pt-5 mb-2 font-bold text-stone-800'>Search Movie Engine</h1>
        <input
          className='border border-solid border-black rounded-md px-36 py-1 bg-transparent'
          type='text'
          placeholder='Search Movie'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8 p-5'>
        {searchedMovie.length === 0 && search === "" ? popular.map((product) => (
          <div key={product.id}>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${product.poster_path}`}
                className='h-full w-full object-cover object-center group-hover:opacity-75'
                alt={product.title}
              />
            </div>
            <h3 className='mt-4 text-xl text-black'><b>{product.title}</b></h3>
            <p className='mt-1 text-sm font-medium text-black'>{product.vote_average}⭐</p>
          </div>
        )) : searchedMovie.map((product) => (
          <div key={product.id}>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${product.poster_path}`}
                className='h-full w-full object-cover group-hover:opacity-75'
                alt={product.title}
              />
            </div>
            <h3 className='mt-4 text-xl text-black'><b>{product.title}</b></h3>
            <p className='mt-1 text-sm font-medium text-black'>{product.vote_average}</p>
          </div>
        ))}
      </div>
      {search !== "" && searchedMovie.length === 0 && (
        <h1 className='text-center text-stone-900 font-extrabold text-7xl font-serif'>404 <br /> OPP'S! NOT FOUND</h1>
      )}
    </div>
  );
}

export default WebMovies;

