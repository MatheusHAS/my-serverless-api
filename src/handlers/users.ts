import { APIGatewayEvent, Callback } from 'aws-lambda'
import middy from '@middy/core'
import validator from '@middy/validator'
import middlewares from '@/middlewares'
import { UserValidatorSchema } from '@/models'
import { SendResponse } from '@/utils/ResponseHandler'
import User from '@/models/User'

export const register = middy(async (event: APIGatewayEvent, context: any, callback: Callback) => {
  const { email, password } = event.body as any
  const existUser: any = await User.findOne({
    email,
  })

  if (existUser && existUser._id) {
    return SendResponse(
      {
        error: true,
        message: 'User already exist',
      },
      callback,
      400
    )
  }

  const newUser = new User({
    email,
    password,
  })

  newUser.save((error: any) => {
    if (error) {
      return SendResponse(
        {
          error: true,
          message: error,
        },
        callback,
        400
      )
    }
  })

  return SendResponse(newUser, callback, 201)
})
  .use(middlewares)
  .use(validator({ inputSchema: UserValidatorSchema }))
