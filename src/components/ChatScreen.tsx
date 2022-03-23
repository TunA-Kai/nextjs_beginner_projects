import {
  DotsVerticalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/outline'
import classNames from 'classnames'
import { addDoc, doc, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore'
import { TMessageItemCL, TMessageItemDB } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { chatsColRef, usersColRef } from '~/firebase.config'
import { getChatMessageColRef } from '~/utils/helpers/firebaseHelper'
import UserAvatar from './UserAvatar'

interface ChatScreenProps {
  messages: TMessageItemCL[]
}

function ChatScreen({ messages: initialMessages }: ChatScreenProps) {
  const inputRef = React.useRef<HTMLDivElement>(null!)
  const messageSectionRef = React.useRef<HTMLTableSectionElement>(null!)
  const user = useUserContext()
  const router = useRouter()

  const chatId = router.query.id as string
  const chatMessageColRef = getChatMessageColRef<TMessageItemDB>(chatId)
  const [messagesSnapshot] = useCollection(query(chatMessageColRef, orderBy('timestamp', 'asc')))
  const messages = messagesSnapshot
    ? messagesSnapshot.docs.map(doc => {
        const data = doc.data()
        const timestamp = data.timestamp?.toMillis()
        return Object.assign({ id: doc.id }, doc.data(), { timestamp })
      })
    : initialMessages

  const [chatSnapshot] = useDocument(doc(chatsColRef, chatId))
  const recipiantEmail = chatSnapshot?.data()?.users.find(e => e !== user.email) ?? ''
  const [recipiantData] = useCollectionData(
    query(usersColRef, where('email', '==', recipiantEmail)),
  )

  React.useLayoutEffect(() => {
    messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight
  })

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // console.log(inputRef.current.textContent)
    if (e.key === 'Enter') {
      e.preventDefault() // prevent adding Enter to input string
      sendMessage()
    }
  }

  function sendMessage() {
    const message = inputRef.current.textContent
    const timestamp = serverTimestamp()

    setDoc(doc(usersColRef, user.uid), { lastSeen: timestamp }, { merge: true })
    addDoc(chatMessageColRef, {
      userEmail: user.email!,
      photoURL: user.photoURL!,
      timestamp,
      message,
    })

    inputRef.current.textContent = ''
  }

  return (
    <div className='flex h-full flex-col'>
      <header className='flex h-20 shrink-0 items-center gap-2 border-b border-slate-300 bg-white px-2'>
        <UserAvatar src={recipiantData?.[0].photoURL} />
        <div>
          <h3>{recipiantEmail}</h3>
          <p>
            Last seen:{' '}
            {recipiantData?.[0].lastSeen.toDate().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              weekday: 'short',
              day: 'numeric',
              month: '2-digit',
            })}
          </p>
        </div>
        <div className='ml-auto flex'>
          <PaperClipIcon className='h-8 w-8' />
          <DotsVerticalIcon className='h-8 w-8' />
        </div>
      </header>

      <section
        className='flex grow flex-col gap-2 overflow-y-auto bg-whatsapp-chocolate p-2'
        ref={messageSectionRef}
      >
        {messages?.map(
          m =>
            m.timestamp && (
              <div
                key={m.id}
                className={classNames('rounded-md py-1 px-2 ', {
                  'self-start bg-whatsapp-blue': m.userEmail === user.email,
                  'self-end bg-whatsapp-green-100': m.userEmail !== user.email,
                })}
              >
                {m.message}
                <br />
                <span className={classNames('text-xs', 'text-slate-600')}>
                  {new Date(m.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    weekday: 'short',
                    day: 'numeric',
                    month: '2-digit',
                  })}
                </span>
              </div>
            ),
        )}
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
          onKeyDown={handleKeyDown}
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
