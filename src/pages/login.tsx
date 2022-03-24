import { signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '~/firebase.config'

interface LoginProps {}

function Login({}: LoginProps) {
  const [user] = useAuthState(auth)
  const router = useRouter()

  React.useEffect(() => {
    if (user) router.push({ pathname: (router.query.returnUrl ?? '/') as string })
  }, [router, user])

  function signIn() {
    signInWithPopup(auth, provider).catch(alert)
  }

  return (
    !user && (
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <main className='flex h-screen w-screen flex-col items-center justify-center gap-8 bg-gradient-to-bl from-whatsapp-green-500 to-whatsapp-green-700'>
          <Image src='/whatsapp-icon.svg' alt='whatsapp icon' width={150} height={150} />
          <button
            className='flex items-center gap-2 border border-slate-600 bg-slate-50 p-2 font-bold uppercase shadow-lg'
            onClick={signIn}
          >
            <Image alt='google icon' src='/google-icon.svg' width={24} height={24} />
            Sign in with Google
          </button>
        </main>
      </div>
    )
  )
}

export default Login
