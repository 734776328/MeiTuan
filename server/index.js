import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

import bodyParser from 'koa-bodyparser'
//帮助操作session的中间件 
import session from 'koa-generic-session'
import Redis from 'koa-redis'
//解决服务端向客户端发送json数据美观可视化效果
import json from 'koa-json'
import dbConfig from './dbs/config.js'
import passport from './interface/utils/passport.js'
import users from './interface/users.js'
import geo from './interface/geo.js'
import search from './interface/search.js'
import categroy from './interface/categroy.js'
import cart from './interface/cart.js'
import order from './interface/order.js'

const app = new Koa()

// Import and Set Nuxt.js options
import config from '../nuxt.config.js'
import mongoose from 'mongoose';
config.dev = !(app.env === 'production')

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
mongoose.connect(dbConfig.dbs, {
  userNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

app.use(users.routes()).use(users.allowedMethods())
app.use(geo.routes()).use(geo.allowedMethods())
app.use(search.routes()).use(search.allowedMethods())
app.use(categroy.routes()).use(categroy.allowedMethods())
app.use(cart.routes()).use(cart.allowedMethods())
app.use(order.routes()).use(order.allowedMethods())
async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  
}
start()
