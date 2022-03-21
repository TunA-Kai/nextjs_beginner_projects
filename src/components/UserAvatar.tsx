import { UserIcon } from '@heroicons/react/outline'
import Image from 'next/image'

interface UserAvatarProps {
  src: string | undefined | null
}

function UserAvatar({ src }: UserAvatarProps) {
  return (
    <div className='h-8 w-8 overflow-hidden rounded-full'>
      {src ? <Image alt='avatar' src={src} width='100%' height='100%' /> : <UserIcon />}
    </div>
  )
}

export default UserAvatar
