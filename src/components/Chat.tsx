import { UserIcon } from '@heroicons/react/outline'
import { query, where } from 'firebase/firestore'
import Image from 'next/image'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { TChatItem, TUserItem } from 'types'
import { useUserContext } from '~/contexts/userContext'
import { usersColRef } from '~/firebase.config'
import AvatarContainer from './AvatarContainer'

interface ChatProps extends TChatItem {}

function Chat({ id, users }: ChatProps) {
  const user = useUserContext()

  const recipiantEmail = users.find(u => u !== user.email)
  const q = query(usersColRef, where('email', '==', recipiantEmail))
  const [data] = useCollectionDataOnce(q)
  const recipiantData = data?.[0] as TUserItem

  return (
    <button className='flex w-full items-center gap-2 p-4 hover:bg-whatsapp-chocolate'>
      <AvatarContainer>
        {recipiantData ? (
          <Image alt='avatar' src={recipiantData.photoURL} width='100%' height='100%' />
        ) : (
          <UserIcon />
        )}
      </AvatarContainer>
      <p>{recipiantEmail}</p>
    </button>
  )
}

export default Chat
