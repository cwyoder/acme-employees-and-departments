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
  render(){
    return (
      <div id='main'>
        <h1>Acme Employees And Departments</h1>
        <p>{ this.state.employees.length } Total Employees</p>
        <Departments employees={ this.state.employees } departments={ this.state.departments } deleteEmployee={this.deleteEmployee} unassignDept={this.unassignDept} />
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
