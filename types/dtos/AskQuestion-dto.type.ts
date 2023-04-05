import { Session } from 'next-auth'

export interface AskQuestionDto {
  prompt: string
  chatId: string
  model: string
  session: Session
}
