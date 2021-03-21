import { APIGatewayEvent, APIGatewayEventRequestContext, Callback } from 'aws-lambda'

export const register = (event: APIGatewayEvent, context: APIGatewayEventRequestContext, callback: Callback) => {
  return callback(null, {
    body: JSON.stringify({
      example: true,
    }),
  })
}
