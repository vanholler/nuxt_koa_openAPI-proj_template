// import axios, { AxiosInstance } from 'axios'
// @ts-ignore
import { Tracer, ConsoleRecorder } from 'zipkin'
// import wrapAxios from 'zipkin-instrumentation-axiosjs'
// import { Context } from 'koa'

// @ts-ignore
import CLSContext = require('zipkin-context-cls')
// import {
//   DefaultApi
// } from './api/api'
//
// import console from './console.trace'
//
// const isProduction = process.env.NODE_ENV === 'production'
const serviceName = 'app'
export const tracer = new Tracer({
  ctxImpl: new CLSContext('zipkin'),
  recorder: new ConsoleRecorder(),
  localServiceName: serviceName
})

// function logRequests (axiosInstance: AxiosInstance) {
//   axiosInstance.interceptors.request.use((request) => {
//     if (isProduction) {
//       tracer.scoped(() => {
//         console.log(`Request: ${JSON.stringify(request.data)}`)
//       })
//     }
//     return request
//   })
//
//   axiosInstance.interceptors.response.use((response) => {
//     if (isProduction) {
//       tracer.scoped(() => {
//         console.log(`Response: ${JSON.stringify(response.data)}`)
//       })
//     }
//     return response
//   })
//
//   return axiosInstance
// }

// const makeRequests = (serviceName:string) => {
//   return logRequests(wrapAxios(axios, { tracer, serviceName }))
// }

// export const userApiInstance = new DefaultApi(
//   { basePath: process.env.APISERVICE_URI }, '', makeRequests('create user')
// )
