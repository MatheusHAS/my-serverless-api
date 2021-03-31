import httpJsonBodyParser from '@middy/http-json-body-parser'
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler'

export default [httpJsonBodyParser(), JSONErrorHandlerMiddleware()]
