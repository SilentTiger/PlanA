import { RedisModel } from './db'

export class r_server extends RedisModel {
  constructor(id: string) {
    super()
    this.sid = id
  }
  /**
   * 服务器id
   */
  sid: string
  /**
   * 服务器接口IP地址
   */
  ip: string
  /**
   * 服务器接口端口号
   */
  port: number
  /**
   * 服务器进程号
   */
  pid: number
  /**
   * 服务器当前连接数
   */
  l_conn: number = 0
}

export default r_server