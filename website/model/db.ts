import { MongoClient, Db } from 'mongodb'
import * as Redis from 'ioredis'
import * as logger from '../service/log'
import { Counter } from '../util'

let db: Db
let db_connected: Boolean = false

let rds: Redis.Redis
let rds_connected: Boolean = false

function connect() {
  return new Promise((resolve, reject) => {
    let counter = new Counter(2, () => { resolve() });
    MongoClient.connect('mongodb://192.168.37.86:27017/plan_a', (err, database) => {
      if (err) {
        logger.error('connect to database error: ', err)
        reject(new Error('Connect to database error.'))
        return
      }
      db = database
      db_connected = true
      console.log('database connected')
      counter.add(1)
    })

    rds = new Redis(6379, '192.168.37.86', { db: 0 })
    rds.on('connect', () => {
      rds_connected = true
      console.log('redis connected')
      counter.add(1)
    })
    rds.on('error', (err) => {
      logger.error('connect to redis error: ', err)
      reject(new Error('Connect to redis error.'))
    })
  })
}

class Model {
  constructor() {
  }
}

class RedisModel {
  constructor() {

  }
}

export {
  connect,
  db,
  db_connected,
  rds,
  rds_connected,
  Model,
  RedisModel
}