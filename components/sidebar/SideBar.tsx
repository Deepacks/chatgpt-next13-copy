'use client'

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

import NewChat from './NewChat'
import ChatRow from './ChatRow'

export default function SideBar() {
  const { data: session } = useSession()

  const [chats] = useCollection(
    session &&
      query(
        collection(db, 'users', session!.user!.email!, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
  )

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex-1">
        <div>
          <NewChat />

          <div>{/* Model Selection */}</div>

          <div className="mt-2 space-y-2">
            {chats?.docs.map((chat, idx) => (
              <ChatRow key={idx} id={chat.id} number={idx + 1} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <button
          onClick={handleSignOut}
          className="mb-2 mx-auto rounded-full flex items-center gap-3 text-gray-300 hover:opacity-50"
        >
          {session.user?.image ? (
            <Image
              className="h-12 w-12 rounded-full"
              src={`/api/imageProxy?imageUrl=${session.user.image}`}
              alt="profile picture"
              height={50}
              width={50}
            />
          ) : (
            'Log out'
          )}
        </button>
      )}
    </div>
  )
}
