import { Model } from './db'
import { ObjectId } from 'mongodb';

export class m_room extends Model {
  constructor() {
    super()
  }

  _id: ObjectId
  /**
   *creator
   */
  c: String = ''
  /**
   * users
   */
  u: Array<String> = []
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
  }> = []
  /**
   * createTime
   */
  ct: Date = new Date
}

export default m_room