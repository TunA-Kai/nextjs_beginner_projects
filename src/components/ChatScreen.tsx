import UserAvatar from './UserAvatar'

interface ChatScreenProps {}

function ChatScreen({}: ChatScreenProps) {
  return (
    <div>
      <header>
        <UserAvatar src={undefined} />
        <div>
          <h3>Recipiant Email</h3>
          <p>Last seen...</p>
        </div>
      </header>
    </div>
  )
}

export default ChatScreen
