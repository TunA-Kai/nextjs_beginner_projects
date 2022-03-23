import { Timestamp } from 'firebase/firestore'

declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

export interface TChatItem {
  id: string
  users: string[]
}

export interface TUserItem {
  email: string
  lastSeen: Timestamp
  photoURL: string
}

export interface TMessageItemDB {
  timestamp: Timestamp
  userEmail: string
  message: string
  photoURL: string
}

export interface TMessageItemCL extends TMessageItemDB {
  id: string
  timestamp: number | null //See readme(3)
}
