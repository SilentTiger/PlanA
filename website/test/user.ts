import * as request from 'supertest'
import { expect } from 'chai'
import { db } from '../model/db'
import server from '../app'
import { m_user } from '../model/user';
import { m_token } from '../model/token';


describe('first test case', function () {
  let phone = '18627098826';
  it('should create a capture', function (done) {
    request(server).get(`/user/getCaptcha/${phone}`).then(res => {
      expect(res.body.code).eq(200)
      done()
    })
  })

  it('should verify captcha', function (done) {
    db.collection('token').find({ p: phone }).toArray().then(res => {
      let captcha = (res.pop() as m_token).c
      request(server).get(`/user/verifyCaptcha/${phone}/${captcha}`).then(res => {
        expect(res.body.code).eq(200)
        done()
      })
    })
  })

  it('should fialed to verify captcha', function (done) {
    request(server).get(`/user/verifyCaptcha/${phone}/xhsjduiehskchej`).then(res => {
      expect(res.body.code).eq(404)
      done()
    })
  })
})
