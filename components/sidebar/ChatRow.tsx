'use client'

import { MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

interface ChatRowProps {
  id: string
  number: number
}

export default function ChatRow({ id, number }: ChatRowProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const [messages] = useCollection(
    collection(db, 'users', session!.user!.email!, 'chats', id, 'messages'),
  )

  const removeChat = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
    if (pathname?.includes(id)) router.replace('/')
  }

  return (
    <Link
      className={`chatRow justify-center ${
        pathname && pathname.includes(id) ? 'bg-gray-700/50' : ''
      }`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-" />

      <p className="flex-1 truncate">
        {messages && (messages.docs?.length ?? -1) > 0
          ? messages.docs[0]?.data().text
          : `New Chat #${number}`}
      </p>

      <button onClick={removeChat}>
        <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" />
      </button>
    </Link>
  )
}
