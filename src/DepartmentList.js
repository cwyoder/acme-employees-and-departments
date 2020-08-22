import React from 'react';
import EmployeeItem from './EmployeeItem'

const DepartmentList = ({department, employees, deleteEmployee, unassignDept}) => {
  return (
    <div className='department'>
      <p>
        { department === 'none' ? `Employees Without Departments` : department.name.toUpperCase() } ({ employees.length})
      </p>
      <ul>
        {
          employees.map(employee => {
            const employeeKey = `employee_${employee.id}`;
            return (
              <EmployeeItem id={employee.id} name={employee.name} deleteEmployee={deleteEmployee} unassignDept={unassignDept} key={employeeKey} status={department === 'none' ? 'noDepartment' : 'yesDepartment'}/>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DepartmentList;
