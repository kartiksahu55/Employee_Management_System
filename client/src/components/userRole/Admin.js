import React, { useState } from "react";
import styleCss from "./Admin.module.css";
// import employeeDataBase from "../../dbData";
import AddEmployee from "../AddEmployee";
import Swal from "sweetalert2";
import axios from "axios";

const Admin = ({ employeeDataDB }) => {
  const [employeeData, setEmpoyeeData] = useState(employeeDataDB);
  const [addEmployee, setAddEmployee] = useState(false);

  const addEmployeeData = (newEmployee) => {
    console.log(newEmployee);
    setEmpoyeeData([...employeeData, newEmployee]);
  };

  // -----Delete Employee-----
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/user/delete/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      Swal.fire("Deleted!", "Employee has been deleted.", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Opps!", "Something went wrong", "error");
    }
  };

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        // const remainData = employeeData.filter((employee)=>employee.id!==key)
        // setEmpoyeeData(employeeData.filter((employee) => employee.id !== id));
        // Swal.fire("Deleted!", "Employee has been deleted.", "success");
      }
    });
  };

  return (
    <div className={styleCss.admin_container}>
      <button
        className={styleCss.add_employee_button}
        onClick={() => setAddEmployee(!addEmployee)}
      >
        {addEmployee ? "Go Back" : "Add Employee"}
      </button>
      {!addEmployee && (
        <div className={styleCss.employee_table_container}>
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
                  <tr key={employee._id}>
                    <td>{i + 1}</td>
                    <td>{employee.id || "NA"}</td>
                    <td>{employee.firstname + " " + employee.lastname}</td>
                    <td>{employee.shift}</td>
                    <td>{employee.gender}</td>
                    <td>
                      <img src={employee.avatar.secure_url} alt="" height="50px" />
                    </td>
                    <td>{employee.dob}</td>
                    <td>{employee.hiredate}</td>
                    <td>
                      <button className={styleCss.edit_button}>Edit✏️</button>
                    </td>
                    <td>
                      <button
                        className={styleCss.delete_button}
                        onClick={() => {
                          deleteHandler(employee.id);
                        }}
                      >
                        Delete❌
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {addEmployee && <AddEmployee addEmployeeData={addEmployeeData} />}
    </div>
  );
};

export default Admin;
