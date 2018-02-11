/* eslint-disable */

const express = require('express')
const app = express();
const path = require('path');
const db = require('./db')
const { models } = db;
const { Employee } = models;

const nunjucks = require('nunjucks');

nunjucks.configure({ noCache: true });

app.set('view engine', 'html')
app.engine('html', nunjucks.render)

app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  res.locals.path = req.url
  let employeeCount, nickCount
  Employee.findAll()
    .then(employees => {
      employeeCount = employees.length;
      nickCount = employees.reduce((memo, employee) => {
        return memo += employee.nicknames.length
      }, 0)
      res.locals.employeeCount = employeeCount
      res.locals.nickCount = nickCount
      next()
    })
    .catch(next)
})

app.use('/employees', require('./routes/employees'));

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'})
})

app.use((err, req, res, next) => {
  res.render('error', {title: 'Error', error: err})
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))

db.sync()
  .then(() => db.seed())
