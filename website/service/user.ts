import * as logger from './log'
import { guid } from '../util'
import { db } from '../model/db'
import m_user from '../model/m_user'
import r_token from '../model/r_token'

import { InsertOneWriteOpResult, ObjectID } from 'mongodb';

/**
 * 生成一个验证码
 * @param phone 用户手机号码
 */
export function createCaptcha(phone: string): Promise<Boolean> {
  // 再检查是否需要写入 user 表
  return db.collection('user').findOneAndUpdate({ p: phone, pw: '' }, new m_user(phone), { upsert: true }).then(res => {
    if (res.ok == 1) {
      let tokenModel = new r_token(phone);
      tokenModel.u = (<m_user>res.value)._id.toHexString()
      //生成验证码，8位正整数，首位不得为0
      tokenModel.c = Math.floor(Math.random() * 9 + 1) * 10000000 + Math.floor(Math.random() * 10000000)
      tokenModel.t = guid()

      return db.collection('token').insert(tokenModel).then(res => {
        if (res.insertedCount === 0) {
          logger.warn('create captcha failed: ', res)
          return false
        } else {
          return true
        }
      })
    } else {
      return false
    }
  })
}

/**
 * 验证用户手机号及验证码并返回token
 * @param phone 用户手机号码
 * @param captcha 验证码
 * @return string | null 生成的token或null则验证失败
 */
export function verifyCaptcha(phone: string, captcha: number): Promise<string | null> {
  return db.collection('token').findOne({ p: phone, c: captcha }, { fields: { t: '1' } })
}

/**
 * 验证用户手机号及密码并返回token
 * @param phone 用户手机号 
 * @param pwd 用户密码
 */
export function verifyPwd(phone: string, pwd: string): Promise<String | null> {
  return db.collection('user').findOne({ p: phone, pw: pwd }).then(res => {
    if (res) {
      let tokenModel = new r_token(phone)
      tokenModel.u = (<m_user>res)._id.toHexString()
      tokenModel.c = Math.floor(Math.random() * 9 + 1) * 10000000 + Math.floor(Math.random() * 10000000)
      tokenModel.t = guid()

      return db.collection('token').insertOne(tokenModel).then(res => {
        if (res.result.ok === 1) {
          return tokenModel.t
        } else {
          return null
        }
      })
    } else {
      return null
    }
  }).catch(err => {
    logger.error('verify pwd error: ', err)
    return null
  })
}

/**
 * 根据token获取用户数据
 * @param token 临时token
 */
export function verifyToken(token: string): Promise<m_user | null> {
  return db.collection('token').findOne({ t: token }).then(res => {
    if (res) {
      let tokenModel = <r_token>res
      return db.collection('user').findOne({ _id: new ObjectID(tokenModel.u) })
    } else {
      return null
    }
  })
}