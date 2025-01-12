'use client'

import { useLanguageStore } from '@/app/store/languageStore'
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

export default function UpcomingPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguageStore()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/upcoming?language=${language}`)
        const data = await response.json()
        
        if (data.results) {
          setMovies(data.results)
        } else {
          setError('Failed to fetch movies')
        }
      } catch (err) {
        setError('Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [language])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4">
            <div className="aspect-[2/3] relative mb-4">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">Release: {movie.release_date}</p>
            <p className="mt-2 line-clamp-3">{movie.overview}</p>
          </div>
        ))}
      </div>
    </main>
  )
}