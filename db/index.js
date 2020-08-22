const Sequelize = require('sequelize');
const faker = require('faker');
const { random } = require('faker');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Employee = conn.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

const Department = conn.define('department', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  }
})

Employee.belongsTo(Department);
Department.hasMany(Employee);

const syncAndSeed = async() => {
  await conn.sync({force: true});

  const departmentPromises = [];
  while(departmentPromises.length < 5){
    departmentPromises.push(
      Department.create({
        name: faker.commerce.department()
      })
    )
  }
  await Promise.all(departmentPromises);

  const employeePromises = [];
  while(employeePromises.length < 50){
    let randomNum = faker.random.number({
      'min': 1,
      'max': 5
    });
    console.log(randomNum);
    employeePromises.push(
      Employee.create({
        name: faker.name.firstName(),
        departmentId: randomNum
      })
    )
  }
  await Promise.all(employeePromises);
}

module.exports = {
  syncAndSeed,
  models: {
    Employee, Department
  }
}
