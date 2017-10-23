import { Router } from 'express'
import * as path from 'path'

import * as debugAction from './action/debug'
import * as userAction from './action/user'

let router = Router()

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

router.get('/user/getCaptcha/:phone', userAction.getCaptcha)
router.get('/user/verifyCaptcha/:phone/:captcha', userAction.verifyCaptcha)

export default router