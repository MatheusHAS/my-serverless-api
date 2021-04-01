import httpJsonBodyParser from '@middy/http-json-body-parser'
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler'
import HttpErrorHandler from '@middy/http-error-handler'
import { DatabaseConnection } from './DatabaseConnection'

export default [HttpErrorHandler(), httpJsonBodyParser(), JSONErrorHandlerMiddleware(), DatabaseConnection()]
