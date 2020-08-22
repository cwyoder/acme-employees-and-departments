import React from 'react';

const EmployeeItem = ({id, name, deleteEmployee, unassignDept, status}) => {
  return (
    <li>
      <p>{name}</p>
      <button onClick={ ()=> deleteEmployee(id) }>x</button>
      {
        status === 'noDepartment' ? '' : <button onClick={ ()=> unassignDept(id) }>Remove From Department</button>
      }
    </li>
  )
}

export default EmployeeItem;
