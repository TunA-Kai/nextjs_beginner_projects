import Head from 'next/head'
import ChatScreen from '~/components/ChatScreen'
import Sidebar from '~/components/Sidebar'

interface ChatProps {}

function Chat({}: ChatProps) {
  return (
    <div className='flex'>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <main className='h-screen grow overflow-y-auto'>
        <ChatScreen />
      </main>
    </div>
  )
}

export default Chat
