import * as request from 'supertest'
import { expect } from 'chai'
import { db } from '../model/db'
import server from '../app'
import { m_user } from '../model/user';
import { m_token } from '../model/token';


describe('first test case', function () {
  let phone = '18627098826';
  it('should create a captcha', function (done) {
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

  it('should verify password', function (done) {
    let userModel = new m_user(phone)
    userModel.pw = 'ooxxoxox'
    db.collection('user').findOneAndUpdate({ p: phone, pw: 'ooxxoxox' }, userModel, { upsert: true }).then(userRes => {
      if (userRes.ok === 1) {
        request(server).get(`/user/verifyPwd/${phone}/${userModel.pw}`).then(res => {
          db.collection('token').findOne({ t: res.body.data.token }).then(token => {
            expect((<m_token>token).u).eq((<m_user>userRes.value)._id.toHexString())
            done()
          })
        })
      }
    })
  })

  it('should verify token', function (done) {
    let userModel = new m_user(phone)
    userModel.pw = 'ooxxoxox'
    db.collection('user').findOneAndUpdate({ p: phone, pw: 'ooxxoxox' }, userModel, { upsert: true }).then(userRes => {
      if (userRes.ok === 1) {
        request(server).get(`/user/verifyPwd/${phone}/${userModel.pw}`).then(res => {
          let token = res.body.data.token
          request(server).get(`/user/verifyToken/${token}xx`).then(res => {
            expect(res.body.code).eq(403)
          }).then(() => {
            request(server).get(`/user/verifyToken/${token}`).then(res => {
              expect(res.body.code).eq(200)
              done()
            })
          })
        })
      }
    })
  })
})
