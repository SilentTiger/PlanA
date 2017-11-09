import { Model } from './db'
import { ObjectId } from 'mongodb';

export class m_token extends Model {
  constructor(phone: string) {
    super()
    this.p = phone
  }

  _id: ObjectId
  /**
   * uid
   */
  u: string = ''
  /**
   * phone
   */
  p: string = ''
  /**
   * capture
   */
  c: Number = 0
  /**
   * token
   */
  t: string = ''
  /**
   * createTime
   */
  ct: Date = new Date()
}

export default m_token