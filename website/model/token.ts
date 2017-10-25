import { Model } from './db'
import { ObjectId } from 'mongodb';

export class m_token extends Model {
  constructor(phone: String) {
    super()
    this.p = phone
  }

  _id: ObjectId
  /**
   * uid
   */
  u: String = ''
  /**
   * phone
   */
  p: String = ''
  /**
   * capture
   */
  c: Number = 0
  /**
   * token
   */
  t: String = ''
  /**
   * createTime
   */
  ct: Date = new Date()
}

export default m_token