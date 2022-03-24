import classNames from 'classnames'
import Head from 'next/head'
import Header from '~/components/Header'
import Navbar from '~/components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <Header />
      <Navbar />
    </div>
  )
}
