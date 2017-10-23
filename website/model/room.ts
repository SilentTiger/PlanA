import { Model } from './db'

export class m_room extends Model {
  constructor() {
    super()
  }

  /**
   *creator
   */
  c: String
  /**
   * users
   */
  u: Array<String>
  /**
   * messages
   */
  m: Array<{
    /**
     * user
     */
    u: String
    /**
     * content
     */
    c: String
    /**
     * time
     */
    t: Date
  }>
  /**
   * createTime
   */
  ct: Date = new Date
}