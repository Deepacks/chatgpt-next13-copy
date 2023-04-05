'use client'

import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

interface SessionProviderProps {
  session: Session | null
}

export default function SessionProvider({
  session,
  children,
}: PropsWithChildren<SessionProviderProps>) {
  return <Provider session={session}>{children}</Provider>
}
