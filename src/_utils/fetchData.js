import { BearerToken, TMDB_BASE_URL } from '@/data/constants'

export async function fetchData(endpoint, options = {}) {
  const url = `${TMDB_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${BearerToken}`,
    },
  }

  const mergedOptions = { ...defaultOptions, ...options } // Merge defaults with any extra options passed

  try {
    const response = await fetch(url, mergedOptions)

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('fetchData error:', error)
    throw error
  }
}

// Fetch Movie Genres
export async function fetchMovieGenres(options = {}) {
  const endpoint = '/genre/movie/list'
  return fetchData(endpoint, options)
}

// Fetch TV Show Genres
export async function fetchTvGenres(options = {}) {
  const endpoint = '/genre/tv/list'
  return fetchData(endpoint, options)
}
