import * as logger from './log'
import { guid } from '../util'
import { db } from '../model/db'
import m_token from '../model/token'
import { InsertOneWriteOpResult } from 'mongodb';

/**
 * 生成一个验证码
 * @param phone 用户手机号码
 */
export function createCaptcha(phone: string): Promise<InsertOneWriteOpResult> {
  //生成验证码，8位正整数，首位不得为0
  let cap = Math.floor(Math.random() * 9 + 1) * 10000000 + Math.floor(Math.random() * 10000000);

  let tokenModel = new m_token(phone);
  tokenModel.c = cap
  tokenModel.t = guid()

  return db.collection('token').insert(tokenModel)
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