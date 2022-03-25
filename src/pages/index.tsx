import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '~/components/Header'
import Movie from '~/components/Movie'
import Navbar from '~/components/Navbar'
import { requests } from '~/utils/requests'

interface HomeProps {
  movies: TMovie[]
}

export default function Home({ movies }: HomeProps) {
  // console.log(movies)
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <Header />
      <Navbar />
      <main
        role='list'
        className='m-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      >
        {movies.map(m => (
          <Movie key={m.id} {...m} />
        ))}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async function (context) {
  const { genre } = context.query
  const url = requests.find(r => r.title === genre)?.url ?? requests[0].url

  const data = await fetch(url)
  const movies = ((await data.json()).results as any[]).map(
    (m): TMovie => ({
      id: m.id,
      overview: m.overview,
      posterUrl: m.poster_path,
      releaseDate: m.release_date,
      title: m.title,
      voteAverage: m.vote_average,
    }),
  )

  return {
    props: { movies },
  }
}
