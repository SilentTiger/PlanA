import { MongoClient, Db } from 'mongodb';
import * as logger from '../service/log';

let db: Db | null = null;

function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://192.168.37.139:27017/plan_a', (err, database) => {
      if (err) {
        logger.error('connect to database error: ', err)
        reject(new Error('Connect to database error.'))
        return
      }
      db = database
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
  Model
}