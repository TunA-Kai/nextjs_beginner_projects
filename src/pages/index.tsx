import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '~/components/Header'
import Navbar from '~/components/Navbar'

interface HomeProps {}

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async function (context) {
  return {
    props: {},
  }
}
