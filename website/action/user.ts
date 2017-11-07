import { Request, Response } from 'express'
import * as log from '../service/log'
import { ajaxReturn } from '../util'
import { RES_CODE } from '../enum'

import * as user_service from '../service/user'

/**
 * 根据手机号获取验证码
 */
export function getCaptcha(req: Request, res: Response) {
  user_service.createCaptcha(req.params['phone']).then(function (result) {
    let code = result ? RES_CODE.OK : RES_CODE.ERROR
    let msg = result ? '' : 'create captcha failed'
    ajaxReturn(res, code, msg);
  })
}

/**
 * 根据手机号和验证码匿名登陆
 */
export function verifyCaptcha(req: Request, res: Response) {
  user_service.verifyCaptcha(req.params['phone'], parseInt(req.params['captcha'])).then(result => {
    let code = RES_CODE.ERROR
    let msg = 'server error'
    let data = undefined

    if (result !== null) {
      code = RES_CODE.OK
      data = {
        token: result
      }
    } else if (result === null) {
      code = RES_CODE.NOT_FOUNT
      msg = 'invalid captcha'
    }

    ajaxReturn(res, code, msg, data);
  })
}

/**
 * 输入用户密码登陆
 */
export function verifyPwd(req: Request, res: Response) {
  user_service.verifyPwd(req.params['phone'], req.params['pwd']).then(result => {
    let code = RES_CODE.ERROR
    let msg = 'server error'
    let data = undefined

    if (result !== null) {
      code = RES_CODE.OK
      data = {
        token: result
      }
    } else if (result === null) {
      code = RES_CODE.NOT_FOUNT
      msg = 'invalid password or user not exist'
    }

    ajaxReturn(res, code, msg, data);
  })
}

/**
 * 验证token并返回用户数据
 */
export function verifyToken(req: Request, res: Response) {
  user_service.verifyToken(req.params['token']).then(result => {
    let code = RES_CODE.DENIED
    let msg = 'invalid token'
    let data = undefined
    if (result !== null) {
      code = RES_CODE.OK
      msg = ''
      data = result
    }
    ajaxReturn(res, code, msg, data)
  })
}