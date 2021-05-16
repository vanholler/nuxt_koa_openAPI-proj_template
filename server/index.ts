import Koa, { Context } from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import UserAuth from './models/user'
import connectDB from './db'
import console from './console.trace'
import router from './routers'

// const socketioJwt = require('socketio-jwt')
// const socketIO = require('socket.io')

const app = new Koa()
const { Nuxt, Builder } = require('nuxt')

// const cors = require('cors')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const RateLimit = require('koa2-ratelimit').RateLimit

const jwtsecret = 'itsNewUser'

// const server = app.listen(3000)

const config = require('../nuxt.config.js')

config.dev = app.env !== 'production'
// test
const limiter = RateLimit.middleware({
  interval: { min: 15 },
  max: 100
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtsecret
}

async function start () {
  app.use(async function handleError (ctx, next) {
    try {
      await next()
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = err
    }
  })

  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(logger((str): void => {
    console.log(str)
  }))
  app.use(json())
  app.use(bodyParser())
  app.use(limiter)
  // app.use(cors())
  // require('./passport')
  app.use(passport.initialize())
  app.use(router.routes()).use(router.allowedMethods())

  app.use((ctx: Context) => {
    ctx.status = 200
    ctx.respond = false
    nuxt.render(ctx.req, ctx.res)
  })

  // ----------Passport Local Strategy--------------//
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email:any, password:any, done:any) {
    UserAuth.findOne({ email }, (err:any, user:any) => {
      if (err) {
        return done(err)
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'User does not exist or wrong password.' })
      }
      return done(null, user)
    })
  })
  )

  // ----------Passport JWT Strategy--------//

  // Expect JWT in the http head

  passport.use(new JwtStrategy(jwtOptions, function (payload:any, done:any) {
    UserAuth.findById(payload.id, (err:any, user:any) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
  )

  await connectDB()

  app.listen(port, host)
  console.info(`Server listening on http://${host}:${port}`)

  // ---Socket Communication-----//
  //   const io = socketIO(server)
  //
  //   io.on('connection', socketioJwt.authorize({
  //     secret: jwtsecret,
  //     timeout: 15000
  //   })).on('authenticated', function (socket:any) {
  //     console.log('this is the name from the JWT: ' + socket.decoded_token.displayName)
  //
  //     socket.on('clientEvent', (data:any) => {
  //       console.log(data)
  //     })
  //   })
  // }
}

start()
