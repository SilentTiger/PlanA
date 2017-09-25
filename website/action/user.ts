import { Request, Response } from 'express'
import db from '../service/db'
import * as log from '../service/log'
import { ajaxReturn } from '../util'
import { RES_CODE } from '../enum'

import * as user_service from '../service/user'

/**
 * 根据手机号获取验证码
 */
export function getCaptcha(req: Request, res: Response) {
  user_service.createCaptcha(req.param('phone')).then(function (result) {
    let code = result ? RES_CODE.OK : RES_CODE.ERROR
    ajaxReturn(res, code);
  })
}

/**
 * 根据手机号和验证码匿名登陆
 */
export function verifyCaptcha(req: Request, res: Response) {
  user_service.verifyCaptcha(req.param('phone'), parseInt(req.param('captcha'))).then(result => {
    let code = RES_CODE.ERROR
    let data = undefined
    if (result !== null) {
      code = RES_CODE.OK
      data = {
        token: result
      }
    }
    ajaxReturn(res, code, undefined, data);
  })
}

/**
 * 输入用户密码登陆
 */
export function login(req: Request, res: Response) {
}

/**
 * 更新个人资料
 */
export function updateProfile(req: Request, res: Response) {
}

/**
 * 更新手机号
 */
export function changePhone(req: Request, res: Response) {
}