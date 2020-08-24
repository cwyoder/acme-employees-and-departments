import React from 'react';
import EmployeeItem from './EmployeeItem'

const DepartmentList = ({department, employees, deleteEmployee, unassignDept, assignRandDept, deleteDepartment}) => {
  return (
    <div className='department'>
      { department === 'none' ? '' : <button onClick={ ()=> deleteDepartment(department.id) }>x</button>}
      <p>
        { department === 'none' ? `Employees Without Departments` : department.name.toUpperCase() } ({ employees.length})
      </p>
      <ul>
        {
          employees.map(employee => {
            const employeeKey = `employee_${employee.id}`;
            return (
              <EmployeeItem id={employee.id} name={employee.name} deleteEmployee={deleteEmployee} unassignDept={unassignDept} assignRandDept={assignRandDept} key={employeeKey} status={department === 'none' ? 'noDepartment' : 'yesDepartment'}/>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DepartmentList;
