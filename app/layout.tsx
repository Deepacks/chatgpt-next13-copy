import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import '@/styles/globals.scss'

import SessionProvider from '@/components/@auth/SessionProvider'
import Login from '@/components/@auth/Login'
import SideBar from '@/components/sidebar/SideBar'
import ClientProvider from '@/components/ClientProvider'

export const metadata = {
  title: 'ChatGPT Messenger',
  description: 'An upgraded version of the ChatGPT app',
  viewport: 'width=device-width, initial-scale=1',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  let content = (
    <>
      <ClientProvider />

      <div className="flex">
        <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
          <SideBar />
        </div>

        <div className="bg-[#343541] flex-1">{children}</div>
      </div>
    </>
  )

  if (!session) content = <Login />

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{content}</SessionProvider>
      </body>
    </html>
  )
}
