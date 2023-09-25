import { createClient } from 'redis'

export const redisClient = createClient({
  url: `redis://${process.env['REDIS_HOST'] || '127.0.0.1'}:${process.env['REDIS_PORT'] || 6379}`
})
