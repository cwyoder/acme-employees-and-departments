import React from 'react';
import DepartmentList from './DepartmentList';

const Departments = ({employees, departments, deleteEmployee, unassignDept}) => {
  const noDepartmentEmployees = employees.filter(employee => {
    return employee.departmentId === null
  })
  return (
    <div className='departments-container'>
      <DepartmentList department='none' employees={noDepartmentEmployees} deleteEmployee={deleteEmployee} key='noDepartment' />
      {departments.map(department => {
        const filteredEmployees = employees.filter(employee => {
          return employee.departmentId === department.id;
        })
        return (
          <DepartmentList department={department} employees={filteredEmployees} deleteEmployee={deleteEmployee} key={department.id} unassignDept={unassignDept}/>
        )
      })}
    </div>
  )
}

export default Departments;
