const path = require('path');
const db = require('./db');
const express = require('express');
const app = express();
const { Employee, Department } = db.models;
const faker = require('faker');

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

app.post('/api/employees', async(req, res, next) => {
  try {
    res.send(await Employee.create({name: faker.name.firstName(), departmentId: null}));
  } catch (err) {
    next(err);
  }
})

app.get('/api/departments', async(req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.send(departments);
  } catch (err) {
    next(err);
  }
});

app.post('/api/departments', async(req, res, next) => {
  try {
    res.send(await Department.create({name: faker.commerce.department()}));
  } catch (err) {
    next(err);
  }
})


app.put('/api/employees/:id', async(req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    res.send(employee);
  } catch (error) {
    next(err);
  }
})


app.delete('/api/employees/:id', async(req, res, next) => {
  try {
    await Employee.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
})

app.delete('/api/departments/:id', async(req, res, next) => {
  try {
    await Department.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
})

app.use((req, res, next) => {
  const error = Error(`Page not found(${req.url})`);
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  console.log(err, err.stack);
  res.status(err.status || 500).send(`
  <html>
    <body>
      <h1>${err}</h1>
      <p>${err.stack}</p>
    </body>
  </html>`)
})

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

