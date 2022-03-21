import {
  DotsVerticalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/outline'
import { addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import * as React from 'react'
import { TMessageItem } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { usersColRef } from '~/firebase.config'
import { getChatMessageColRef } from '~/utils/helpers/firebaseHelper'
import UserAvatar from './UserAvatar'

interface ChatScreenProps {}

function ChatScreen({}: ChatScreenProps) {
  const user = useUserContext()
  const router = useRouter()
  const inputRef = React.useRef<HTMLDivElement>(null!)

  function handleKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
    // console.log(inputRef.current.textContent)
    if (e.key === 'Enter') sendMessage()
  }

  function sendMessage() {
    const message = inputRef.current.textContent
    const timestamp = serverTimestamp()

    setDoc(doc(usersColRef, user.uid), { lastSeen: timestamp }, { merge: true })
    addDoc(getChatMessageColRef<TMessageItem>(router.query.id as string), {
      userEmail: user.email!,
      photoURL: user.photoURL!,
      timestamp,
      message,
    })

    inputRef.current.textContent = ''
  }

  return (
    <div className='flex h-full flex-col'>
      <header className='flex h-20 items-center gap-2 border-b border-slate-300 bg-white px-2'>
        <UserAvatar src={undefined} />
        <div>
          <h3>Recipiant Email</h3>
          <p>Last seen...</p>
        </div>
        <div className='ml-auto flex'>
          <PaperClipIcon className='h-8 w-8' />
          <DotsVerticalIcon className='h-8 w-8' />
        </div>
      </header>

      <section className='grow overflow-y-auto bg-whatsapp-chocolate'>
        <div className='h-screen'></div>
      </section>

      <section className='flex items-center gap-2 p-2'>
        <button type='button'>
          <EmojiHappyIcon className='h-8 w-8' />
        </button>
        <div
          contentEditable
          suppressContentEditableWarning
          spellCheck
          role='textbox'
          className='grow rounded-md bg-whatsapp-chocolate p-2 outline-none focus:ring-2 focus:ring-whatsapp-green-700'
          onKeyUp={handleKeyUp}
          ref={inputRef}
        >
          <p className='whitespace-pre-wrap break-all'>
            <br />
          </p>
        </div>

        <button type='button' onClick={sendMessage}>
          <PaperAirplaneIcon className='h-8 w-8' />
        </button>
      </section>
    </div>
  )
}

export default ChatScreen
