import * as knex from 'knex'

let k = knex({
  client: 'mysql',
  connection: {
    host: '192.168.37.185',
    user: 'root',
    password: 'MyNewPass4!',
    database: 'plan_a'
  }
})

export default k