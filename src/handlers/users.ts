import { APIGatewayEvent, Callback } from 'aws-lambda'
import middy from '@middy/core'
import validator from '@middy/validator'
import middlewares from '@/middlewares'
import { UserValidatorSchema } from '@/models'

export const register = middy((event: APIGatewayEvent, context: any, callback: Callback) =>
  callback(null, {
    body: JSON.stringify({
      example: true,
    }),
  })
)
  .use(middlewares)
  .use(validator({ inputSchema: UserValidatorSchema }))
