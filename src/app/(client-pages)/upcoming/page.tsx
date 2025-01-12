'use client'

import { useLanguageStore } from '@/app/store/languageStore'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

function MovieSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="aspect-[2/3] relative mb-4 w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-1/4 mb-2 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-full mt-1 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-2/3 mt-1 bg-gray-200 animate-pulse rounded" />
    </div>
  )
}

export default function UpcomingPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/upcoming?language=${language}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.results) {
          setMovies(data.results)
        } else {
          throw new Error('No results in response')
        }
      } catch (err) {
        console.error("Error fetching movies:", err)
        setError(err instanceof Error ? err.message : 'Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [language])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button 
          onClick={() => {
            setError(null)
            setLoading(true)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 text-lg">No upcoming movies found</div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
          >
            <div className="aspect-[2/3] relative mb-4 w-full h-[400px]">
              {movie.poster_path ? (
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold truncate">{movie.title}</h2>
            <p className="text-gray-600 text-sm">
              Release: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700 line-clamp-3">{movie.overview}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Rating: {movie.vote_average.toFixed(1)}/10
              </span>
              <span className="text-xs text-gray-500">
                ({movie.vote_count} votes)
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}