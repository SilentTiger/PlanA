import * as express from 'express'
import * as path from 'path'
import router from './router'
import * as db from './model/db'
import * as logger from './service/log'

const app: express.Express = express()

db.connect().then(() => {
  app.use(router)
  app.use(express.static(path.join(__dirname, 'public')))

  app.listen(3000, function () {
    console.log('server start!')
  })
}).catch(err => {
  logger.error('app start error: ', err)
})

export default app;