import * as logger from './log'
import { guid } from '../util'

/**
 * 生成一个验证码
 * @param phone 用户手机号码
 */
export function createCaptcha(phone: string): Promise<any> {
  //生成验证码，8位正整数，首位不得为0
  let cap = Math.floor(Math.random() * 9 + 1) * 10000000 + Math.floor(Math.random() * 10000000);

  let t = {
    ut_id: 0,
    ut_phone: phone,
    u_captcha: cap
  }


  return new Promise(function (resolve) {
  })
}

/**
 * 验证用户手机号及验证码
 * @param phone 用户手机号码
 * @param captcha 验证码
 * @return string | null 生成的token或null则验证失败
 */
export function verifyCaptcha(phone: string, captcha: number): Promise<string | null> {
  return new Promise(function (resolve) {
  })
}