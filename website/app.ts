import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import router from './router'
import * as db from './model/db'
import * as logger from './service/log'
import * as ws from 'ws'

const webApp: express.Express = express()
const wsApp = new ws.Server({ port: 3001 })

webApp.use(bodyParser.json())

db.connect().then(() => {
  webApp.use(router)
  webApp.use(express.static(path.join(__dirname, 'public')))

  // 跑 testcase 的时候不要真的监听端口
  if (process.env.NODE_ENV !== 'test') {
    webApp.listen(3000, function () {
      console.log('server start!')
    })
  } else {
    console.log('server start on test')
  }
}).catch(err => {
  logger.error('webApp start error: ', err)
})

export { webApp, wsApp };