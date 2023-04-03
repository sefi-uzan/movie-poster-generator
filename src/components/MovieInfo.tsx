import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import MovieResult from './MovieResult';

type MovieData = {
  Title: string;
  Director: string;
  Year: string;
  Actors: string;
  Poster: string;
};

type ApiResponse = MovieData & {
  Error?: string;
};

const MovieInfo: React.FC = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  const handleSubmit = async (input: string) => {
    try {
      console.log('Input value:', input);
      const response = await axios.get<ApiResponse>(`https://www.omdbapi.com/?apikey=2b1a31e&i=${input}`);
      if ('Error' in response.data) {
        console.error('Error fetching movie data:', response.data.Error);
      } else {
        console.log('Fetched movie data:', response.data);
        setMovieData(response.data);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleClick = (input: string) => {
    handleSubmit(input).catch((error) => {
      console.error('Error in handleSubmit:', error);
    });
  };

  return (
    <div className='mx-auto box-border flex max-w-xl flex-col items-center justify-between bg-rose-100 py-2 text-zinc-900'>
      <InputForm onSubmit={handleClick}/>
      {movieData && <MovieResult movieData={movieData} />}
    </div>
  );
};

export default MovieInfo;