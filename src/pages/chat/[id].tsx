import { GetServerSideProps, GetServerSidePropsResult, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ChatScreen from '~/components/ChatScreen'
import Sidebar from '~/components/Sidebar'

interface ChatProps {}

function Chat({}: ChatProps) {
  const router = useRouter()
  return (
    <div className='flex'>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <main className='h-screen grow overflow-y-auto'>
        <ChatScreen key={router.query.id as string} />
      </main>
    </div>
  )
}

export default Chat
