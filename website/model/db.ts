import { MongoClient, Db } from 'mongodb';
import * as logger from '../service/log';

let db: Db;
let db_connected: Boolean = false

function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://192.168.37.185:27017/plan_a', (err, database) => {
      if (err) {
        logger.error('connect to database error: ', err)
        reject(new Error('Connect to database error.'))
        return
      }
      db = database
      db_connected = true
      console.log('database connected')
      resolve()
    })
  })
}

class Model {
  constructor() {
  }
}

export {
  connect,
  db,
  db_connected,
  Model
}