interface AvatarContainerProps {
  children: React.ReactNode
}

function AvatarContainer({ children }: AvatarContainerProps) {
  return <div className='h-8 w-8 overflow-hidden rounded-full'>{children}</div>
}

export default AvatarContainer
