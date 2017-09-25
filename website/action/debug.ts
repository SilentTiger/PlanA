import { Request, Response } from 'express'
import db from '../service/db'

export function showTable(req: Request, res: Response) {
  let tableName = req.param('name')
  db.select().from(tableName).then(function (rows: Array<m_user>) {
    res.send(rows);
  })
}