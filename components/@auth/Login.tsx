'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Login() {
  const handleSignIn = () => {
    signIn('google')
  }

  return (
    <div className="bg-[#11A37F] h-screen flex-center-col">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png?20230318122128"
        width={200}
        height={200}
        alt="logo"
      />

      <button
        onClick={handleSignIn}
        className="mt-8 text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  )
}
