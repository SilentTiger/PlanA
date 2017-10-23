import { Model } from './db'

export class m_user extends Model {
  constructor() {
    super()
  }
  /**
   * name
   */
  n: String
  /**
   * phone
   */
  p: String
  /**
   * pwd
   */
  pw: String
  /**
   * avatar
   */
  a: String
  /**
   * profile
   */
  pf: String
  /**
   * rooms
   */
  r: Array<String>
  /**
   * contacts
   */
  c: Array<String>
  /**
   * createTime
   */
  ct: Date = new Date()
}

export default m_user