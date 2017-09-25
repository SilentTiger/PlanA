import db from './db'
import * as knex from 'knex'
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
  } as m_user_temp


  return new Promise(function (resolve) {
    db.insert(t).into('user_temp').then(() => {
      resolve(true)
    }).catch(function (err: Error) {
      logger.error(phone, 'get captcha error', err);
      resolve(false)
    })
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
    db.del().from('user_temp').where({
      ut_phone: phone,
      ut_captcha: captcha
    }).then((count: number) => {
      if (count > 0) {
        resolve(guid())
      } else {
        resolve(null)
      }
    }).catch((err: Error) => {
      logger.error('verify captcha error', err)
      resolve(null)
    })
  })
}