import { Request, Response } from 'express'
import * as log from '../service/log'
import { ajaxReturn } from '../util'
import { RES_CODE } from '../enum'
import * as server_service from '../service/server'

/**
 * 列出所有服务器
 */
export function list(req: Request, res: Response) {
  server_service.list().then(servers => {
    ajaxReturn(res, RES_CODE.OK, '', servers)
  }).catch(err => {
    ajaxReturn(res, RES_CODE.ERROR, 'list servers error', err)
  })
}

/**
 * 添加一个服务节点，使服务节点生效
 */
export function regist(req: Request, res: Response) {
  let { ip, port, pid }: { ip: string, port: number, pid: number } = req.query
  if (ip && port > 0 && pid > 0) {
    server_service.regist(ip, port, pid).then(server_id => {
      ajaxReturn(res, RES_CODE.OK, '', { server_id })
    }).catch(err => {
      ajaxReturn(res, RES_CODE.ERROR, 'regist server error', err)
    })
  } else {
    ajaxReturn(res, RES_CODE.BAD_REQUEST, 'error params')
  }
}

/**
 * 移除一个服务节点，将服务节点挂起
 */
export function unregist(req: Request, res: Response) {
  const { sid }: { sid: string } = req.query
  if (sid.length === 32) {
    server_service.unregist(sid).then(count => {
      ajaxReturn(res, count > 0 ? RES_CODE.OK : RES_CODE.NOT_FOUNT)
    }).catch(err => {
      ajaxReturn(res, RES_CODE.ERROR, 'unregist server error', err)
    })
  } else {
    ajaxReturn(res, RES_CODE.BAD_REQUEST, 'error params')
  }
}

/**
 * 激活或冻结一个connector
 */
export function active(req: Request, res: Response) {
  const { sid, actived }: { sid: string, actived: boolean } = req.query
  if (sid.length === 32) {
    server_service.active(sid, actived).then(() => {
      ajaxReturn(res, RES_CODE.OK)
    }).catch(err => {
      ajaxReturn(res, RES_CODE.ERROR, 'active server error')
    })
  } else {
    ajaxReturn(res, RES_CODE.BAD_REQUEST, 'error params')
  }
}

/**
 * ping 方法，更新服务器状态信息
 */
export function ping(req: Request, res: Response) {
  const { sid, ...data }: { sid: string, data: any } = req.body
  server_service.ping(sid, data)
  ajaxReturn(res, RES_CODE.OK)
}

/**
 * 提醒服务器更新节点信息
 */
export function reload(req: Request, res: Response) {

}

/**
 * 重新平衡各服务器负载
 */
export function balance(req: Request, res: Response) {

}