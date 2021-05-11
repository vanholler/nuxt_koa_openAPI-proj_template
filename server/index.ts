import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import Koa, { Context } from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import UserAuth from './models/user'
import connectDB from './db'
import console from './console.trace'
// import router from './routers'
import auth from './routers/auth'

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

const limiter = RateLimit.middleware({
  interval: { min: 15 },
  max: 100
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtsecret
}

async function start () {
  const nuxt = new Nuxt(config)
  const {
    protocol,
    port
  } = nuxt.options.server

  // Inside docker container listen on all ip addresses (0.0.0.0)
  const host = '0.0.0.0'

  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
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
  // app.use(router.routes())

  app.use(auth.routes()).use(auth.allowedMethods())
  // app.use(router.routes()).use(router.allowedMethods())

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

  if (protocol === 'https') {
    try {
      const options = {
        key: fs.readFileSync(path.resolve(process.cwd(), 'common/SSL/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.resolve(process.cwd(), 'common/SSL/server.crt'), 'utf8')
      }

      https.createServer(options, app.callback()).listen(port, host)
      console.log(`Server listening on https://${host}:${port}`)
    } catch (e) {
      console.error('Failed to start HTTPS server ', e)
    }
  } else {
    try {
      http.createServer(app.callback()).listen(port, host)
      console.log(`Server listening on http://${host}:${port}`)
    } catch (e) {
      console.error('Failed to start HTTP server ', e)
    }
  }

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
