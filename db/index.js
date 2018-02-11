const conn = require('./conn')
const Employee = require('./Employee')

const sync = () => {
  return conn.sync({force: true})
}

const seed = () => {
  return Promise.all([
    Employee.create({ firstName: 'Jeremy', lastName: 'Philipson', nicknames: 'JP, JPhil' }),
    Employee.create({ firstName: 'Joe', lastName: 'Love', nicknames: 'J-Love' }),
    Employee.create({ firstName: 'Steve', lastName: 'Collins', nicknames: 'Stevie' })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
}
