import { User } from 'firebase/auth'
import * as React from 'react'

const UserContext = React.createContext<User | undefined>(undefined)
UserContext.displayName = 'UserContext'

function UserProvider({ children, user }: { children: React.ReactNode; user: User }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function useUserContext() {
  const user = React.useContext(UserContext)
  if (user === undefined) throw new Error('useUserContext must be used within a UserProvider')

  return user
}

export { UserProvider, useUserContext }
