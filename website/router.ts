import { Router } from 'express'
import * as path from 'path'

import * as debug from './action/debug'

let router = Router()

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

router.get('/debug/showTable/:name', debug.showTable)

export default router