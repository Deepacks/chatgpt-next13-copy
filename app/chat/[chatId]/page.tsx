import Chat from '@/components/chat/Chat'
import ChatInput from '@/components/chat/ChatInput'

interface PageProps {
  params: {
    chatId: string
  }
}

export default function ChatPage({ params: { chatId } }: PageProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Chat chatId={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  )
}
