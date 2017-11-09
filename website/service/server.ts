import * as logger from './log'
import { db, rds } from '../model/db'
import { guid } from '../util'
import { r_server } from '../model/r_server';

/**
 * 注册一个connector
 * @param ip 服务器IP地址
 * @param port 服务器端口号
 * @param pid 服务器进程id
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