import openAiApi from './chatgpt'

const queryApi = async (prompt: string, chatId: string, model: string) => {
  try {
    const res = await openAiApi.createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return (
      res.data.choices[0].text ??
      'ChatGPT was unable to find an answer for that!'
    )
  } catch (e: any) {
    return `ChatGPT was unable to find an answer for that! (Error: ${e.message})`
  }
}

export default queryApi
