import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserProvider } from '~/contexts/userContext'
import { auth, usersColRef } from '~/firebase.config'
import '~/styles/global.css'
import Login from './login'

export default function MyApp({ Component, pageProps }: AppProps) {
  // https://github.com/csfrequency/react-firebase-hooks/tree/edab3f3f3b5ec01c8aafcc6096755dfcc69e4408/auth
  const [user, loading] = useAuthState(auth)

  React.useEffect(() => {
    if (user) {
      const { email, photoURL } = user
      const docRef = doc(usersColRef, user.uid)
      setDoc(docRef, { email, lastSeen: serverTimestamp(), photoURL }, { merge: true })
    }
  }, [user])

  if (loading)
    return (
      <div className='grid h-screen w-screen place-items-center'>
        <Image alt='spinner' src='/spinner.svg' width={200} height={200} />
      </div>
    )

  if (!user) return <Login />

  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}
