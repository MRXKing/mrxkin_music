const router = require('koa-router')()
const mongodb = require('../model/mongodb').getInstance()
const fs = require('fs')
const path = require('path')
const send = require('koa-send');
let dir = path.join(__dirname,'../public/')
function check(){
  return new Promise((reslove,reject) => {

    let info =  fs.readdirSync(dir)
    let arr = new Array();
    for (let [index,value] of info.entries()) {
          let state = value.split('-')
          let id = index+1
          if (id < 10) {
            id = `0${id}`
          }
          let title = state[1].split('.')[0]
          let singger = state[0]
          let data = {
            id,
            title,
            singger,
            name:'未知',
            time:'未知'
          }
          arr.push(data)
    }
    reslove(arr)
  })
}
router.get('/list', async (ctx, next) => {
  let checks = await check();
  ctx.body = checks
})
router.get('/music', async (ctx,next) => {
  let filename = `${ctx.query['music_singger']} - ${ctx.query['music_name']}.mp3`
  let url = path.join(__dirname,'../public/');
  ctx.response.type = 'audio/mpeg'
  ctx.set('Accept-Ranges','bytes')
  ctx.set('Cache-Control','max-age=86400')
  await send(ctx, filename, { root:url });
})

module.exports = router
