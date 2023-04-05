import { serverTimestamp } from 'firebase/firestore'

export interface Message {
  text: string
  createdAt: ReturnType<typeof serverTimestamp>
  user: {
    _id: string
    name: string
    avatar: string
  }
}
