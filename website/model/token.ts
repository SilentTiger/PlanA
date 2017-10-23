import { Model } from './db'

export class m_token extends Model {
  constructor(phone: String) {
    super()
    this.p = phone
  }

  /**
   * phone
   */
  p: String
  /**
   * capture
   */
  c: Number
  /**
   * token
   */
  t: String
  /**
   * createTime
   */
  ct:Date = new Date()
}

export default m_token