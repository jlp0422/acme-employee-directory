const conn = require('./conn')
const Employee = require('./Employee')

const sync = () => {
  return conn.sync({force: true})
}

const seed = () => {
  return Promise.all([
    Employee.create({ firstName: 'Jeremy', lastName: 'Philipson', position: 'CEO', nicknames: 'JP, JPhil' }),
    Employee.create({ firstName: 'Jake', lastName: 'Love', position: 'Director of Fun', nicknames: 'J-Love' }),
    Employee.create({ firstName: 'Steve', lastName: 'Collins', position: 'He just works here', nicknames: 'Stevie' })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
}
