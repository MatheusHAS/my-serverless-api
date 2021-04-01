import { Callback } from 'aws-lambda'

export const SendResponse = (
  body: any,
  callback: Callback,
  statusCode: number = 200,
  error: string | Error | null = null
) => {
  return callback(error, {
    body: JSON.stringify(body),
    statusCode,
  })
}
