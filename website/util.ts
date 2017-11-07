import { Request, Response } from 'express'
import { RES_CODE } from './enum'

export function ajaxReturn(res: Response, code: RES_CODE, msg: string = '', data: any = {}) {
  res.send({ code, msg, data })
}

export const guid = (function (): () => string {
  function s8(): string {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
  }
  return function (): string {
    return s8() + s8() + s8() + s8();
  }
})();

export class Counter {
  count: number = 0
  cb: Function
  constructor(count: number, cb: Function) {
    this.count = count
    this.cb = cb
  }
  add(step: number) {
    this.count -= step
    this.tryTrigger()
  }
  minus(step: number) {
    this.count += step
    this.tryTrigger()
  }
  private tryTrigger() {
    if (this.count === 0) {
      this.cb()
    }
  }
}