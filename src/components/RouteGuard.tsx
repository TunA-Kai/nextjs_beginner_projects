import { setDoc, serverTimestamp, doc } from 'firebase/firestore'
import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserProvider } from '~/contexts/userContext'
import { auth, usersColRef } from '~/firebase.config'
import Login from '~/pages/login'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface RouteGuardProps {
  children: React.ReactNode
}

function RouteGuard({ children }: RouteGuardProps) {
  // https://github.com/csfrequency/react-firebase-hooks/tree/edab3f3f3b5ec01c8aafcc6096755dfcc69e4408/auth
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const url = router.asPath
  const inLoginPage = url.split('?')[0].includes('login')

  React.useEffect(() => {
    if (user) {
      const { email, photoURL } = user
      const docRef = doc(usersColRef, user.uid)
      setDoc(docRef, { email, lastSeen: serverTimestamp(), photoURL }, { merge: true })
    }

    // if after loading, we don't have user and are not in Login page
    if (!loading && !user && !inLoginPage) {
      router.push({
        pathname: '/login',
        // query: { returnUrl: url },
      })
    }
  }, [user, url, loading])

  if (loading)
    return (
      <div className='grid h-screen w-screen place-items-center bg-whatsapp-chocolate'>
        <Image alt='spinner' src='/spinner.svg' width={200} height={200} />
      </div>
    )

  if (inLoginPage) return <>{children}</>

  return user && <UserProvider user={user}>{children}</UserProvider>
}

export default RouteGuard
