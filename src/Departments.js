import React from 'react';
import DepartmentList from './DepartmentList';

const Departments = ({employees, departments, deleteEmployee, unassignDept, assignRandDept, deleteDepartment}) => {
  const noDepartmentEmployees = employees.filter(employee => {
    //return employee.departmentId === null
    return !departments.map(dept => dept.id).includes(employee.departmentId)
  })
  return (
    <div className='departments-container'>
      <DepartmentList department='none' employees={noDepartmentEmployees} deleteEmployee={deleteEmployee} assignRandDept={assignRandDept} key='noDepartment' />
      {departments.map(department => {
        const filteredEmployees = employees.filter(employee => {
          return employee.departmentId === department.id;
        })
        return (
          <DepartmentList department={department} employees={filteredEmployees} deleteEmployee={deleteEmployee} key={department.id} unassignDept={unassignDept} deleteDepartment={deleteDepartment}/>
        )
      })}
    </div>
  )
}

export default Departments;
