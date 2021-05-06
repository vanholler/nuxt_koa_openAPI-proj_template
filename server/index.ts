import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import Koa, { Context } from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
// import passport from 'koa-passport'

// import auth from './routers/auth'
// import router from './routers'

const app = new Koa()
const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

app.keys = [process.env.SESSION_SECRET || '']
const sessionConfig = {
  key: 'koa:sess',
  autoCommit: false
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

  app.use(logger((str):void => {
    console.log(str)
  }))
  app.use(json())
  app.use(session(sessionConfig, app))
  app.use(bodyParser())

  // require('./passport')
  // app.use(passport.initialize())
  // app.use(passport.session())

  // app.use(auth.routes()).use(auth.allowedMethods())
  // app.use(router.routes()).use(router.allowedMethods())

  app.use((ctx:Context) => {
    ctx.status = 200
    ctx.respond = false
    nuxt.render(ctx.req, ctx.res)
  })

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
}

start()
