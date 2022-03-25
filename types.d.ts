declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

interface TMovie {
  id: number
  title: string
  overview: string
  posterUrl: string
  releaseDate: string
  voteAverage: number
}
