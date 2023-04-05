import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openAiApi = new OpenAIApi(config)

export default openAiApi
