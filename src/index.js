import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Departments from './Departments';

class Main extends Component {
  constructor(){
    super()
    this.state = {
      employees: [],
      departments: []
    }
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.unassignDept = this.unassignDept.bind(this);
    this.assignRandDept = this.assignRandDept.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
  }
  async componentDidMount(){
    try {
      const employees = (await Axios.get('/api/employees')).data;
      const departments = (await Axios.get('/api/departments')).data;
      this.setState({
        employees: employees,
        departments: departments
      })
    } catch (err) {
      console.log('Problem importing data from /api')
    }
  }
  async createEmployee() {
    const response = await Axios.post('api/employees');
    const newEmployee = response.data;
    const employeeArr = this.state.employees;
    employeeArr.push(newEmployee);
    this.setState({employees: employeeArr})
  }
  async createDepartment() {
    const response = await Axios.post('api/departments');
    const newDept = response.data;
    const deptArr = this.state.departments;
    deptArr.push(newDept);
    this.setState({departments: deptArr});
  }
  async deleteEmployee(id) {
    await Axios.delete(`api/employees/${id}`);
    const employees = this.state.employees.filter(employee => employee.id !== id);
    this.setState({employees: employees});
  }
  async unassignDept(id) {
    await Axios.put(`api/employees/${id}`, {departmentId: null});
    const employees = this.state.employees;
    const employee = employees.find(employee => employee.id === id);
    employee.departmentId = null;
    this.setState({employees: employees});
  }
  async assignRandDept(id) {
    const deptIdArr = this.state.departments.map(dept => dept.id);
    const randId = deptIdArr[Math.floor(Math.random() * deptIdArr.length)];
    await Axios.put(`api/employees/${id}`, {departmentId: randId});
    const employees = this.state.employees;
    const employee = employees.find(employee => employee.id === id);
    employee.departmentId = randId;
    this.setState({employees: employees});
  }
  async deleteDepartment(id) {
    //remove departmentId from each employee, don't render yet
    const employees = this.state.employees;
    const filterEmployees = employees.filter(employee => {
      return employee.departmentId === id;
    })
    filterEmployees.forEach(async (employee) => {
      await Axios.put(`api/employees/${employee.id}`, {departmentId: null});
    })
    const stateEmployees = employees.map(employee => {
      if (employee.departmentId === id) employee.departmentId = null;
      return employee;
    })

    //delete department
    await Axios.delete(`api/departments/${id}`);
    const departments = this.state.departments.filter(dept => dept.id !== id);

    //render once
    this.setState({employees: stateEmployees, departments: departments});
  }
  render(){
    return (
      <div id='main'>
        <h1>Acme Employees And Departments</h1>
        <p>{ this.state.employees.length } Total Employees</p>
        <button onClick={()=> this.createEmployee()}>Add employee</button>
        <button onClick={()=> this.createDepartment()}>Add department</button>
        <Departments employees={ this.state.employees } departments={ this.state.departments } deleteEmployee={this.deleteEmployee} unassignDept={this.unassignDept} assignRandDept={this.assignRandDept} deleteDepartment={this.deleteDepartment}/>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
