import { APIGatewayEvent, Callback } from 'aws-lambda'
import middy from '@middy/core'
import validator from '@middy/validator'
import middlewares from '@/middlewares'
import { UserValidatorSchema, UserDocument } from '@/models'
import UserModel from '@/models/User'

export const register = middy(async (event: APIGatewayEvent, context: any, callback: Callback) => {
  const { email, password } = event.body as any
  const existUser: any = await UserModel.findOne({
    email,
  })

  if (existUser && existUser._id) {
    return callback(null, {
      body: JSON.stringify({
        error: true,
        message: 'User already exist',
        statusCode: 400,
      }),
    })
  }
  const newUser = new UserModel({
    email,
    password,
  })
  newUser.save((error: any, doc: any) => {
    console.log(error)
  })
  return callback(null, {
    body: JSON.stringify(newUser),
  })
})
  .use(middlewares)
  .use(validator({ inputSchema: UserValidatorSchema }))
