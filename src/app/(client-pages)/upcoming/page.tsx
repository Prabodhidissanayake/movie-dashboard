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
        console.log("error",err)
        setError('Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [language])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="aspect-[2/3] relative mb-4 w-full h-[400px]">
              <Image 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                priority={false}
              />
            </div>
            <h2 className="text-xl font-semibold truncate">{movie.title}</h2>
            <p className="text-gray-600 text-sm">Release: {movie.release_date}</p>
            <p className="mt-2 text-gray-700 line-clamp-3">{movie.overview}</p>
          </div>
        ))}
      </div>
    </main>
  )
}