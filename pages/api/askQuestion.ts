import admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AskQuestionDto } from '@/types/dtos/AskQuestion-dto.type'
import type { Message } from '@/types/Message.type'
import queryApi from '@/lib/queryApi'
import { adminDb } from '@/firebaseAdmin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    prompt,
    chatId,
    model = 'text-davinci-003',
    session,
  } = req.body as AskQuestionDto

  if (!prompt || !chatId || !session) {
    res.status(400).send({})
    return
  }

  const response = await queryApi(prompt, chatId, model)

  const message: Message = {
    text: response,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png?20230318122128',
    },
  }

  await adminDb
    .collection('users')
    .doc(session.user?.email!)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).send({})
}
