/* eslint-disable */

const app = require('express').Router();
const db = require('../db/');
const { models } = db
const { Employee } = models

module.exports = app

app.get('/', (req, res, next) => {
  Employee.findAll()
    .then((employees) => res.render('employees', {employees, title: 'Employees'}))
    .catch(next)
})

app.get('/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => res.render('employee', {employee, title: `${employee.fullName}`}))
    .catch(next)
})

app.post('/', (req, res, next) => {
  Employee.create(req.body)
    .then(() => res.redirect(`/employee/${employee.id}`))
    .catch(next)
})

app.delete('/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => employee.destroy())
    .then(() => res.redirect('/employees'))
    .catch(next)
})

app.patch('/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      Object.assign(employee, req.body)
      return employee.save()
    })
    .then(() => res.redirect('/employees'))
    .catch(next)
})
