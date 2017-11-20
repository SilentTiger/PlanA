import { Router } from 'express'
import * as path from 'path'

import * as debugAction from './action/debug'
import * as userAction from './action/user'
import * as serverAction from './action/server'

let router = Router()

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

router.get('/user/getCaptcha/:phone', userAction.getCaptcha)
router.get('/user/verifyCaptcha/:phone/:captcha', userAction.verifyCaptcha)
router.get('/user/verifyPwd/:phone/:pwd', userAction.verifyPwd)
router.get('/user/verifyToken/:token', userAction.verifyToken)

router.get('/server/regist', serverAction.regist)
router.get('/server/unregist', serverAction.unregist)
router.get('/server/list', serverAction.list)
router.post('/server/active', serverAction.active)
router.post('/server/ping', serverAction.ping)

export default router