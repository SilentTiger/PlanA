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
   * 激活状态
   */
  actived: boolean = false
  /**
   * 服务器当前连接数
   */
  l_conn: number = 0
  /**
   * 服务器上一次更新状态时间戳
   */
  time: number = Date.now()
}

export default r_server