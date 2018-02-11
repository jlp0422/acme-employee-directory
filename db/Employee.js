/* eslint-disable */

const conn = require('./conn')
const Sequelize = conn.Sequelize

const Employee = conn.define('employee', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  nicknames: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(val) {
      // throw 'fizz buzz';
      if(typeof val === 'string') {
        const nicks = val.split(',')
        this.setDataValue('nicknames', nicks)
      }
      else {
        this.setDataValue('nicknames', [])
      }
    }
  }
}, {
    getterMethods: {
      fullName: function () {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
      }
    }
  })

module.exports = Employee

