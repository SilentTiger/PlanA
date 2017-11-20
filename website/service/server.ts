import * as logger from './log'
import { db, rds } from '../model/db'
import { guid } from '../util'
import { r_server } from '../model/r_server';
import { CONNECTOR_TIMEOUT } from '../enum'

/**
 * 注册一个connector
 * @param ip 服务器IP地址
 * @param port 服务器端口号
 * @param pid 服务器进程id
 * @returns Promis<string> 返回生成的服务器id
 */
export function regist(ip: string, port: number, pid: number): Promise<string> {
  let server_id = guid()
  let s = new r_server(server_id)
  s.ip = ip
  s.port = port
  s.pid = pid
  return new Promise((resolve, reject) => {
    rds.hset(`servers`, server_id, JSON.stringify(s), function (err: Error, res: number) {
      if (err) {
        logger.error('server regist error ', err)
        reject(err)
        return
      }
      resolve(server_id)
    })
  })
}

/**
 * 注销一个connector
 * @param sid 服务器id
 */
export function unregist(sid: string): Promise<number> {
  return new Promise((resolve, reject) => {
    rds.hdel('servers', sid, (err: Error, res: number) => {
      if (err) {
        logger.error('server unregist error ', err)
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

/**
 * 列出所有服务器
 */
export function list(): Promise<Array<r_server>> {
  return new Promise((resolve, reject) => {
    rds.hgetall('servers', (err: Error, res: any) => {
      if (err) {
        logger.error('list server error ', err)
        reject(err)
        return
      }
      resolve(Object.keys(res).map(key => { return JSON.parse(res[key]) as r_server }))
    })
  })
}

/**
 * 激活或冻结指定服务器
 * @param sid 服务器id
 */
export function active(sid: string, actived: boolean): Promise<undefined> {
  return new Promise((resolve, reject) => {
    rds.hget('servers', sid, (err: Error, res: string) => {
      if (err) {
        logger.error('active get server error ', err)
        reject(err)
        return
      }
      console.log('start active ', sid, res)
      let resData = <r_server>JSON.parse(res)
      Object.assign(resData, { actived: actived })
      rds.hset('servers', resData.sid, JSON.stringify(resData), (err: Error, result: number) => {
        if (err) {
          logger.error('active update server error')
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}

/**
 * ping 方法，用于更新服务器状态更新时间
 * @param sid 服务器id
 * @param data 更新的数据
 */
export function ping(sid: string, data: any) {
  rds.hget('servers', sid, (err: Error, res: string) => {
    if (err) {
      logger.error('ping get server error ', err)
      return
    }
    let resData = <r_server>JSON.parse(res)
    Object.assign(resData, data, { time: Date.now() })
    rds.hset('servers', resData.sid, JSON.stringify(resData), (err: Error, res: number) => {
      if (err) {
        logger.error('ping set server error ', err)
        return
      }
    })
  })
}

// 每秒检查各个 connector 状态更新时间，若超过 3s 则判为冻结
setInterval(() => {
  let now = Date.now()
  list().then(servers => {
    servers.filter(s => {
      return now - s.time > CONNECTOR_TIMEOUT && s.actived
    }).forEach(s => {
      active(s.sid, false).catch(err => {
        logger.error('check connector active server error ', err)
      })
    })
  }).catch(err => {
    logger.error(`check connector error @${(new Date()).toISOString()} `, err)
  })
}, 1000)