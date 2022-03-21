import { query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { TChatItem, TUserItem } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { usersColRef } from '~/firebase.config'
import UserAvatar from './UserAvatar'

interface ChatProps extends TChatItem {}

function Chat({ id, users }: ChatProps) {
  const user = useUserContext()
  const router = useRouter()

  const recipiantEmail = users.find(u => u !== user.email)
  const q = query(usersColRef, where('email', '==', recipiantEmail))
  const [data] = useCollectionDataOnce(q)
  const recipiantData = data?.[0] as TUserItem

  function enterChat() {
    router.push({ pathname: '/chat/[id]', query: { id } })
  }

  return (
    <button
      className='flex w-full items-center gap-2 p-4 hover:bg-whatsapp-chocolate'
      onClick={enterChat}
    >
      <UserAvatar src={recipiantData?.photoURL} />
      <p>{recipiantEmail}</p>
    </button>
  )
}

export default Chat
