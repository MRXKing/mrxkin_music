//npm install koa-generator -g koa2 -e koa2
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
const compress = require('koa-compress')
const convert = require('koa-convert');
const staticCache = require('koa-static-cache')
const path = require('path');
//controller
const index = require('./controller/index')
const login = require('./controller/login')
const register = require('./controller/register')

// error handler

onerror(app)

// middlewares
app.use(compress({
  filter: function (content_type) {
  	return /text/i.test(content_type)
  },
  threshold: 1024,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(convert(staticCache(path.join(__dirname, 'public'), {
    maxAge: 365 * 24 * 60 * 60
})))
app.use(cors({
  origin: function(ctx) {
    if (ctx.method == 'OPTION') {
      ctx.body = '';
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 86400,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','OPTION'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(require('koa-static')(__dirname+'/public'))
app.use(json())
app.use(logger())
app.keys = ['some secret hurr'];
const CONFIG = {
  key:'koa-session',
  maxAge:86400000,
  renew:true //session 快过期时请求会重新设置session
  // rolling:true   每次请求都重新设置session
  //httpOnly:true 只有服务器端可以获取cookie
};
app.use(session(CONFIG,app))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(register.routes(), register.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//router.use('/admin',admin.routes()) //层级路由
module.exports = app
