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
  n: string = ''
  /**
   * phone
   */
  p: string = ''
  /**
   * pwd
   */
  pw: string = ''
  /**
   * avatar
   */
  a: string = ''
  /**
   * profile
   */
  pf: string = ''
  /**
   * rooms
   */
  r: Array<string> = []
  /**
   * contacts
   */
  c: Array<string> = []
  /**
   * createTime
   */
  ct: Date = new Date()
}

export default m_user