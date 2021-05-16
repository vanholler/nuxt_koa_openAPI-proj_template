// import { Context } from 'koa'
// import { userApiInstance } from './utils'

// export function ensureAuthenticated (ctx:Context) {
//   if (ctx.isUnauthenticated()) {
//     ctx.body = 'Not authenticated'
//     ctx.status = 418
//     throw new Error('Not authenticated')
//   }
// }

// export async function createUser (ctx:Context, data) {
//   // ensureAuthenticated(ctx)
//   console.log(ctx)
//   return (await userApiInstance.createUser(data)).data
// }
