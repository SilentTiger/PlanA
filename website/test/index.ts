import 'mocha'
import * as request from 'supertest'
import { webApp as server } from '../app'
import { db_connected, rds_connected } from '../model/db'

before('init test enviroment', function (done) {
  setTimeout(() => {
    if (db_connected && rds_connected) {
      done()
    }
  }, 1000)
})

after('all test finished', function (done) {
  done()
  process.exit();
})