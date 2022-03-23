import { getDocs, orderBy, query } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { TMessageItemCL, TMessageItemDB } from 'types'
import ChatScreen from '~/components/ChatScreen'
import Sidebar from '~/components/Sidebar'
import { getChatMessageColRef } from '~/utils/helpers/firebaseHelper'

interface ChatProps {
  chatId: string
  messages: TMessageItemCL[]
}

function Chat({ chatId, messages }: ChatProps) {
  return (
    <div className='flex'>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <main className='h-screen grow overflow-y-auto'>
        <ChatScreen key={chatId} messages={messages} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ChatProps> = async function (context) {
  const chatId = context.query.id as string
  // get all the messages in chatDoc
  const messages = (
    await getDocs(query(getChatMessageColRef<TMessageItemDB>(chatId), orderBy('timestamp', 'asc')))
  ).docs.map(doc => {
    const data = doc.data()
    const timestamp = data.timestamp.toMillis()
    return Object.assign({ id: doc.id }, doc.data(), { timestamp })
  }) as TMessageItemCL[]

  return {
    props: { chatId, messages },
  }
}

export default Chat
