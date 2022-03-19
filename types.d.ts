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
