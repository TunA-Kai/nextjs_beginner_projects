import type { AppProps } from 'next/app'
import * as React from 'react'
import RouteGuard from '~/components/RouteGuard'
import '~/styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  )
}
