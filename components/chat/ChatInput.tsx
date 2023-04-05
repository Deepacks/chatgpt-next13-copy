'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import { Message } from '@/types/Message.type'

export default function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState('')
  const model = 'text-davinci-003'

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setPrompt(value)

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return

    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      },
    }

    const notification = toast.loading('ChatGPT is thinking...')

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages',
      ),
      message,
    )

    try {
      await fetch('/api/askQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          chatId,
          model,
          session,
        }),
      })

      toast.dismiss(notification)
    } catch (_) {}
  }

  return (
    <div className="m-3 bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form className="p-5 space-x-5 flex" onSubmit={handleFormSubmit}>
        <input
          disabled={!session}
          className="bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={handleInputChange}
        />

        <button
          disabled={!prompt || !session}
          className="px-3 py-3 rounded bg-[#11A37F] hover:opacity-50 text-white font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  )
}
