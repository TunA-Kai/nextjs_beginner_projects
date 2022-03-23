import { query, where } from 'firebase/firestore'
import Link from 'next/link'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { TChatItem, TUserItem } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { usersColRef } from '~/firebase.config'
import UserAvatar from './UserAvatar'

interface ChatProps extends TChatItem {}

function Chat({ id, users }: ChatProps) {
  const user = useUserContext()

  const recipiantEmail = users.find(u => u !== user.email)
  const q = query(usersColRef, where('email', '==', recipiantEmail))
  const [data] = useCollectionData(q)
  const recipiantData = data?.[0] as TUserItem

  return (
    <Link href={{ pathname: '/chat/[id]', query: { id } }}>
      <a className='flex w-full items-center gap-2 p-4 hover:bg-whatsapp-chocolate'>
        <UserAvatar src={recipiantData?.photoURL} />
        <p>{recipiantEmail}</p>
      </a>
    </Link>
  )
}

export default Chat
