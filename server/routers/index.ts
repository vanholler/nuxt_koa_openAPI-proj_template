import Router from 'koa-router'
import { Context, DefaultState } from 'koa'

import auth from './auth'
// import order from './order'
const router = new Router<DefaultState, Context>({ prefix: '/api' })

router.use(auth.routes()).use(auth.allowedMethods())
// router.use(party.routes()).use(party.allowedMethods())
// router.use(transaction.routes()).use(transaction.allowedMethods())
// router.use(order.routes()).use(order.allowedMethods())
export default router
