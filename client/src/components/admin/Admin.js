import React, { useState } from "react";
import styleCss from "./Admin.module.css";
import employeeDataBase from "../../dbData";
import {} from "@fortawesome/free-solid-svg-icons";

const Admin = ({adminData}) => {
  const [employeeData, setEmpoyeeDate] = useState(employeeDataBase);

  return (
    <div className={styleCss.main_container}>
      {/* <div className={styleCss.sub_container}> */}
        <button className={styleCss.button_container}>Employee Data Table</button>
        <div>
          Show: <input type="number" readOnly />
        </div>
      {/* </div> */}
      <div className={styleCss.employee_table_container}>
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
                <tr>
                  <td>{i + 1}</td>
                  <td>{employee.id}</td>
                  <td>{employee.shift}</td>
                  <td>{employee.name}</td>
                  <td>{employee.gender}</td>
                  <td>
                    <img src={employee.image} alt="" height="50px" />
                  </td>
                  <td>{employee.dob}</td>
                  <td>{employee.hiredate}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
