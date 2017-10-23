import * as request from 'supertest'
import server from '../app'


describe('first test case', function () { 
  it('response to /debug/showTable/:name', function (done) {
    request(server).get('/debug/showTable/user').expect(200, done);
  })
})
