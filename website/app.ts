import * as express from 'express'
import * as path from 'path'
import router from './router'
import * as db from './model/db'
import * as logger from './service/log'

const app: express.Express = express()

db.connect().then(() => {
  app.use(router)
  app.use(express.static(path.join(__dirname, 'public')))

  // 跑 testcase 的时候不要真的监听端口
  if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, function () {
      console.log('server start!')
    })
  } else {
    console.log('server start on test')
  }
}).catch(err => {
  logger.error('app start error: ', err)
})

export default app;