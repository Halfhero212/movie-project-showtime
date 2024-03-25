'use client'
import React from 'react'
import Link from 'next/link'
import { GoDot } from 'react-icons/go'
import HeartIcon from '../HeartIcon'
import WishListCheck from '../WishListIcon'
import { BsFillPlayFill } from 'react-icons/bs'
import Cards from '../Cards'
import TvCard from './TVCard'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const TvShowDetails = ({ movieDetails, credits, relatedMovies, trailers }) => {
  const director = credits.crew.find(
    (member) => member.job === 'Director',
  )?.name

  const screenplay = credits.crew
    .filter((member) => member.job === 'Screenplay')
    .slice(0, 2)
    .map((member) => member.name)

  const mainTrailer = trailers.results.find(
    (trailer) => trailer.site === 'YouTube',
  )

  const getYear = (year) => {
    const date = new Date(year)
    return date.getFullYear()
  }
  const convertRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden ">
      <div className=" mx-auto pb-12 ">
        <div>
          <div
            className="flex flex-col lg:flex-row p-6 pt-32"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${IMAGE_BASE_URL}${movieDetails.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Movie Poster */}
            <div className="flex-none mb-4 lg:mb-0">
              <img
                src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
                alt={`Poster of ${movieDetails.name}`}
                className="rounded-lg shadow-lg w-full lg:w-80 lg:h-96 object-cover"
              />
            </div>
            {/* Movie Details */}
            <div className="lg:ml-8 lg:w-3/4">
              <div className="flex flex-row gap-2 items-center mb-4">
                <h1 className="lg:text-4xl text-3xl text-white font-Poppins font-bold">
                  {movieDetails.name}
                </h1>
                <p className="text-gray-200 font-Poppins font-bold text-sm lg:text-xl">
                  ({getYear(movieDetails.first_air_date)})
                </p>
              </div>

              <div className="mb-6">
                <div className="flex flex-row gap-2 items-center">
                  <p className="border-white border-opacity-60 text-sm text-white text-opacity-60 border-solid border-2 py-0 px-2">
                    {movieDetails.original_language}
                  </p>
                  <GoDot className="text-white" />
                  <p className="text-sm text-white font-Poppins ">
                    {movieDetails.first_air_date}
                  </p>
                  <GoDot className="text-white" />
                  <p className="text-sm text-white font-Poppins ">
                    {movieDetails.genres
                      .map((genre) => genre.name)
                      .slice(0, 3)
                      .join(', ')}
                  </p>
                  {/* <GoDot className="text-white" />
                  <p className="text-sm text-white font-Poppins ">
                    {convertRuntime(movieDetails.runtime)}
                  </p> */}
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center mb-6">
                <div
                  className="rounded-full cursor-pointer hover:scale-110 text-xl text-white font-bold transition-all duration-300 ease-in-out bg-gray-900 w-16 h-16 flex items-center justify-center"
                  title={`${movieDetails.vote_count} user score`}
                >
                  <p>{Math.round(movieDetails.vote_average * 10)}%</p>
                </div>
                <p className="text-sm text-white font-bold font-Roboto">
                  User<br></br>Score
                </p>
              </div>

              <div className="flex flex-row items-center gap-6 mb-8">
                <HeartIcon />
                <WishListCheck />
                <div>
                  <button
                    onClick={() => {
                      window.open(
                        `https://www.youtube.com/watch?v=${mainTrailer.key}`,
                        '_blank',
                      )
                    }}
                    className="flex items-center justify-center gap-1 text-white font-bold hover:text-gray-300 transition duration-300"
                  >
                    <BsFillPlayFill className='text-2xl' />
                    Play Trailer
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-xl font-Poppins font-semibold tracking-wide text-white mb-2">
                  Overview
                </p>
                <p className="mb-4 text-white font-Roboto font-normal leading-5 text-sm">
                  {movieDetails.overview}
                </p>
              </div>

              {/* <div className="flex flex-wrap flex-row gap-10 mb-10">
                <div className="text-white font-Poppins text-sm font-medium">
                  <p>{director}</p>
                  <p className="font-light">Director</p>
                </div>

                <div className="text-white font-Poppins text-sm font-medium">
                  <ul className="flex flex-wrap flex-row gap-10">
                    {screenplay.map((member, index) => (
                      <li key={index}>
                        <p>{member}</p>
                        <p className="font-light">Screenplay</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>

          <div>
            {/* Movie Porduction companies 
             <div className="flex flex-col min-w-full items-center lg:w-1/4 p-4">
              <h2 className="text-gray-900 text-xl font-Poppins font-semibold mb-4">
                Production Companies
              </h2>
              <div className="flex flex-row gap-10 justify-center items-center w-full">
                {movieDetails.production_companies.slice(0,3).map((company) => (
                  <div key={company.id}>
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="w-24 h-1/2"
                      />
                    )}
                   
                  </div>
                ))}
              </div>
            </div>
            */}

            {/* Main Cast */}
            <div className="mt-10">
              <div className="flex justify-center">
                <h2 className="text-xl font-bold font-Poppins">
                  Top billed cast
                </h2>
              </div>
              <Cards actors={credits.cast.slice(0, 5)} />
            </div>

            {/* Related Movies */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-bold font-Poppins mb-4">
                  Related Movies
                </h2>
              </div>
              <div className="lg:flex lg:flex-wrap -mx-2">
                {relatedMovies.results.slice(0, 5).map((relatedMovie) => (
                  <div key={relatedMovie.id} className="md:w-1/5 p-2">
                    <Link href={`/tvShows/${relatedMovie.id}`}>
                      <TvCard tvShow={relatedMovie} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Trailer Section */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TvShowDetails