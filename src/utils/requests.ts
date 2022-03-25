const API_KEY = process.env.API_KEY

function getUrl(genreId: number) {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`
}

export const requests = [
  {
    title: 'Trending',
    url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
  },
  {
    title: 'Top Rated',
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  },
  {
    title: 'Action',
    url: getUrl(28),
  },
  {
    title: 'Comedy',
    url: getUrl(35),
  },
  {
    title: 'Horror',
    url: getUrl(27),
  },
  {
    title: 'Romance',
    url: getUrl(10749),
  },
  {
    title: 'Mystery',
    url: getUrl(9648),
  },
  {
    title: 'Sci-Fi',
    url: getUrl(878),
  },
  {
    title: 'Western',
    url: getUrl(37),
  },
  {
    title: 'Animation',
    url: getUrl(16),
  },
  {
    title: 'TV Movie',
    url: getUrl(10770),
  },
]
