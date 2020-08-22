const path = require('path');
const db = require('./db');
const express = require('express');
const app = express();
const { Employee, Department } = db.models;

app.use(require('body-parser').json());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/api/employees', async(req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch (err) {
    next(err)
  }
});

app.get('/api/departments', async(req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.send(departments);
  } catch (err) {
    next(err)
  }
});

const port = process.env.PORT || 5055;

const init = async () => {
  try{
    await db.syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch (err) {
    console.log(err);
  }
}

init();

