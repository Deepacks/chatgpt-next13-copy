import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'

interface MessageProps {
  message: DocumentData
}

export default function Message({ message }: MessageProps) {
  const avatar = message.user.avatar

  const isChatGPT = message.user.name === 'ChatGPT'

  return (
    <div className={`py-5 text-white ${isChatGPT ? 'bg-[#434654]' : ''}`}>
      <div className="px-10 max-w-2xl mx-auto flex space-x-5">
        <Image
          className="h-8 w-8"
          src={
            avatar.includes('googleusercontent.com')
              ? `/api/imageProxy?imageUrl=${avatar}`
              : avatar
          }
          alt="user avatar"
          width={50}
          height={50}
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  )
}
