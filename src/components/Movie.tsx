import Image from 'next/image'

interface MovieProps extends TMovie {}

function Movie({ posterUrl, title, overview, releaseDate }: MovieProps) {
  return (
    <div role='listitem' className='flex flex-col gap-2'>
      <Image
        alt={title}
        src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
        height='100%'
        width='100%'
        layout='responsive'
        placeholder='blur'
        blurDataURL={`https://image.tmdb.org/t/p/w92/${posterUrl}`}
      />
      {overview}
      <br />
      <br />
      {releaseDate}
    </div>
  )
}

export default Movie
