import { Request, Response } from 'express'

export function showTable(req: Request, res: Response) {
  let tableName = req.param('name')
  res.sendStatus(200).end();
}