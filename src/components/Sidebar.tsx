import { ChatAltIcon, DotsVerticalIcon, SearchIcon } from '@heroicons/react/outline'
import { signOut } from 'firebase/auth'
import { doc, getDoc, query, setDoc, where } from 'firebase/firestore'
import Image from 'next/image'
import { useCollection } from 'react-firebase-hooks/firestore'
import { TChatItem } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { auth, chatsColRef } from '~/firebase.config'
import { validateEmail } from '~/utils/helpers/emailValidator'
import AvatarContainer from './AvatarContainer'
import Chat from './Chat'

interface SidebarProps {}

function Sidebar({}: SidebarProps) {
  const user = useUserContext()

  const chatQuery = query(chatsColRef, where('users', 'array-contains', user.email))
  const [chatsSnapshot] = useCollection(chatQuery)

  const chats = chatsSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TChatItem[]

  async function createChat() {
    const input = prompt(
      'Please enter an eamil address for the user you wish to chat with',
      'tuna-kai@gmail.com',
    )

    if (!input || input === user.email || !validateEmail(input)) return

    // add chat into DB 'chats' collection if it doesn't exist
    const chatDocRef = doc(chatsColRef, `${user.email}_${input}`)
    const chatDocSnap = await getDoc(chatDocRef)
    if (!chatDocSnap.exists()) setDoc(chatDocRef, { users: [user.email, input] })
  }

  return (
    <aside>
      <header className='sticky top-0 z-10 mx-4 flex h-20 items-center gap-4 border-b border-slate-200 bg-white'>
        <button className='mr-auto' onClick={() => signOut(auth)}>
          <AvatarContainer>
            <Image alt='avatar' src={user.photoURL!} width='100%' height='100%' />
          </AvatarContainer>
        </button>
        <button>
          <ChatAltIcon className='h-8 w-8' />
        </button>
        <button>
          <DotsVerticalIcon className='h-8 w-8' />
        </button>
      </header>

      <section className='flex items-center gap-4 rounded-sm p-5'>
        <SearchIcon className='h-8 w-8' />
        <input type='search' placeholder='Search in chats' className='grow outline-none' />
      </section>

      <button
        className='w-full border-y border-slate-200 p-2 font-bold uppercase'
        onClick={createChat}
      >
        Start a new chat
      </button>

      {chats?.map(c => (
        <Chat key={c.id} {...c} />
      ))}
    </aside>
  )
}

export default Sidebar
