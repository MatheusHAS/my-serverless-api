import mongoose, { Connection } from 'mongoose'

export const MongoClient = {
  async connect() {
    return mongoose.connect(process.env.MONGO_URI || '', {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  },
  async getConnection(): Promise<Connection> {
    return mongoose.connection
  },

  close() {
    return mongoose.connection.close()
  },
}
