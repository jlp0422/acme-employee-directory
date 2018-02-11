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
      const nicks = val.split(',')
      this.setDataValue('nicknames', nicks)
    }
  }
}, {
    getterMethods: {
      fullName: function () {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
      }
    }
  }
)

module.exports = Employee

