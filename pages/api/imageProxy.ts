import { withImageProxy } from '@/lib/withImageProxy'

export default withImageProxy({
  whitelistedPatterns: [/^https?:\/\/(.*).googleusercontent.com/],
})
