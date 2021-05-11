import { DefaultState, Context } from 'koa'
import Router from 'koa-router'
import passport from 'koa-passport'
const jwt = require('jsonwebtoken')
const UserAuth = require('../models/user')

const jwtsecret = 'itsNewUser'
// const UserAuth = require('../models/user')
const router = new Router<DefaultState, Context>()

router.post('/user', async (ctx: Context, next) => {
  try {
    ctx.body = await UserAuth.create(ctx.request.body)
  } catch (err) {
    ctx.status = 400
    ctx.body = err
  }
  await next()
})

router.post('/login', async (ctx: Context, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user === false) {
      ctx.body = 'Login failed'
      console.log('err', err)
    } else {
      // --payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      }
      const token = jwt.sign(payload, jwtsecret) // здесь создается JWT

      ctx.body = { user: user.displayName, token: 'JWT ' + token }
    }
  })(ctx, next)
})

router.get('/custom', async (ctx: Context, next) => {
  await passport.authenticate('jwt', (err, user) => {
    if (user) {
      ctx.body = 'hello ' + user.displayName
    } else {
      ctx.body = 'No such user'
      console.log('err', err)
    }
  })(ctx, next)
})

export default router
