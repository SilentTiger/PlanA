import { Request, Response } from 'express'
import * as log from '../service/log'
import { ajaxReturn } from '../util'
import { RES_CODE } from '../enum'

/**
 * 列出所有服务器
 */
export function list(req: Request, res: Response) {
  
}

/**
 * 添加一个服务节点，使服务节点生效
 */
export function add(req: Request, res: Response) {
}

/**
 * 移除一个服务节点，将服务节点挂起
 */
export function remove(req: Request, res: Response) {
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