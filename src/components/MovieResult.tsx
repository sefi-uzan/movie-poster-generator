import { api } from "@/utils/api";
import Image from "next/image";
import React from "react";

type MovieData = {
  Title: string;
  Director: string;
  Year: string;
  Actors: string;
  Poster: string;
};

type MovieResultProps = {
  movieData: MovieData;
};

const MovieResult: React.FC<MovieResultProps> = ({ movieData }) => {
  api.generatePdf.generatePdf.useQuery<MovieData>({
    movieData,
  });

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-y-2 border border-zinc-950 py-4">
      <h1 className="text-4xl font-extrabold">{movieData.Title}</h1>
      <p>
        <span className="font-bold">Director: </span>
        {movieData.Director}
      </p>
      <p>
        <span className="font-bold">Year: </span>
        {movieData.Year}
      </p>
      <p>
        <span className="font-bold">Actors: </span>
        {movieData.Actors}
      </p>
      <Image
        src={movieData.Poster}
        alt={`${movieData.Title} Poster`}
        width={400}
        height={400}
      />
    </div>
  );
};

export default MovieResult;
