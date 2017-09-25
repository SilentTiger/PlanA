import * as express from 'express'
import * as path from 'path'
import router from './router'

const app = express()

app.use(router)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, function () {
  console.log('server start!')
})