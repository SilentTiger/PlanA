import { Model } from './db'
import { ObjectId } from 'mongodb';

export class m_user extends Model {
  constructor(phone: string) {
    super()
    this.p = phone
  }
  _id: ObjectId
  /**
   * name
   */
  n: String = ''
  /**
   * phone
   */
  p: String = ''
  /**
   * pwd
   */
  pw: String = ''
  /**
   * avatar
   */
  a: String = ''
  /**
   * profile
   */
  pf: String = ''
  /**
   * rooms
   */
  r: Array<String> = []
  /**
   * contacts
   */
  c: Array<String> = []
  /**
   * createTime
   */
  ct: Date = new Date()
}

export default m_user