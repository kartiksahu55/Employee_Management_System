import React, { useEffect, useState } from "react";
import styleCss from "./Admin.module.css";
import employeeDataBase from "../../dbData";
import {} from "@fortawesome/free-solid-svg-icons";
import AddEmployee from "../AddEmployee";

const Admin = () => {
  const [employeeData, setEmpoyeeData] = useState(employeeDataBase);
  const [addEmployee, setAddEmployee] = useState(false)

  const addEmployeeData=(newEmployee)=>{
    console.log(newEmployee);
    setEmpoyeeData([...employeeData,newEmployee])
  }

  console.log(employeeData);

  // useEffect(()=>{

  // },[employeeData])

  return (
    <div className={styleCss.admin_container}>
      <button className={styleCss.add_employee_button}
      onClick={()=>setAddEmployee(!addEmployee)}
      >{addEmployee?"Go Back":"Add Employee"}</button>
      {!addEmployee && <div className={styleCss.employee_table_container}>
      <div>
        Show: <input type="number" readOnly />
      </div>
        <table className={styleCss.employee_table}>
          {/* Table Head */}
          <thead className={styleCss.employee_table_head}>
            <tr>
              <th>Sl. No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Shift</th>
              <th>Gender</th>
              <th>Image</th>
              <th>DOB</th>
              <th>Hire Date</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {employeeData.map((employee, i) => {
              return (
                <tr key={employee.id}>
                  <td>{i + 1}</td>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.shift}</td>
                  <td>{employee.gender}</td>
                  <td>
                    <img src={employee.image} alt="" height="50px" />
                  </td>
                  <td>{employee.dob}</td>
                  <td>{employee.hiredate}</td>
                  <td>
                    <button className={styleCss.edit_button}>
                      Edit✏️
                    </button>
                  </td>
                  <td>
                    <button className={styleCss.delete_button}>
                      Delete❌
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
      {addEmployee && <AddEmployee addEmployeeData={addEmployeeData}/>}
    </div>
  );
};

export default Admin;
