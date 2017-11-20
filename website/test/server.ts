import * as request from 'supertest'
import { expect } from 'chai'
import { db } from '../model/db'
import { webApp as server } from '../app'
import { m_user } from '../model/m_user';
import { m_token } from '../model/m_token';
import { Counter } from '../util'
import { r_server } from '../model/r_server';


describe('test server service', function () {
  let server_id: string
  it('should regist server success', function (done) {
    request(server).get(`/server/regist?ip=111&port=1234&pid=333`).then(res => {
      expect(res.body.code).eq(200)
      server_id = res.body.data.server_id
      done()
    })
  })

  it('should active server success', function (done) {
    request(server).post(`/server/active`).type('json').send({ sid: server_id, actived: true }).then(res => {
      expect(res.body.code).eq(200)
      done()
    })
  })

  it('should ping server success', function (done) {
    this.timeout(2100)
    setTimeout(() => {
      request(server).post(`/server/ping`).type('json').send({ sid: server_id, l_conn: 1 }).then(res => {
        done()
      })
    }, 2000)
  })

  it('should not inactive the connector', function (done) {
    request(server).get('/server/list').then(res => {
      let target: r_server = (res.body.data.filter((s: r_server) => {
        return s.sid === server_id
      }))[0]

      expect(target.actived).eq(true)
      done()
    })
  })

  it('should inactive the connector', function (done) {
    this.timeout(4100)
    setTimeout(() => { 
      request(server).get('/server/list').then(res => {
        let target: r_server = (res.body.data.filter((s: r_server) => {
          return s.sid === server_id
        }))[0]
  
        expect(target.actived).eq(false)
        done()
      })
    }, 4000)
  })

  it('should failed to unregist server cause bad sid', function (done) {
    request(server).get('/server/unregist?sid=xxxx').then(res => {
      expect(res.body.code).eq(400)
      done()
    })
  })

  it('should failed to unregist server', function (done) {
    request(server).get('/server/unregist?sid=12345678901234567890123456789012').then(res => {
      expect(res.body.code).eq(404)
      done()
    })
  })

  it('should show all servers', function (done) {
    request(server).get('/server/list').then(res => {
      expect(res.body.data.length).eq(1)
      done()
    })
  })

  it('should unregist server success', function (done) {
    request(server).get(`/server/unregist?sid=${server_id}`).then(res => {
      expect(res.body.code).eq(200)
      done()
    })
  })

})