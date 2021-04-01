import middy from '@middy/core'
import { MongoClient } from '@/config/MongoClient'

export const DatabaseConnection = () => {
  return {
    before: async (handler: middy.HandlerLambda, next: middy.NextFunction) => {
      const connection = await MongoClient.getConnection()
      if (connection.readyState) {
        console.log('Using existing connection')
        return next()
      }
      console.log('Creating new connection')
      return MongoClient.connect()
        .then(() => {
          console.log('Database connected')
          return next()
        })
        .catch((error: any) => {
          throw new Error(error)
        })
    },
  }
}
