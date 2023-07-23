import React, { useState } from "react";
import styleCss from "./Admin.module.css";
// import employeeDataBase from "../../dbData";
import AddEmployee from "../AddEmployee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import EditEmployee from "../EditEmployee";
import {delete_api} from "../../config"

const Admin = ({ isAdmin, employeeDataDB }) => {
  const [employeeData, setEmpoyeeData] = useState(employeeDataDB);
  const [addEmployeePage, setAddEmployeePage] = useState(false);
  const [editEmployeePage, setEditEmployeePage] = useState(false);
  const [selectEditEmployee, setSelectEditEmployee] = useState(null);

  console.log(employeeData);
  // After New Employee Added, update employeeData!
  const afterAddEmployeeHandler = (newEmployee) => {
    setEmpoyeeData([...employeeData, newEmployee]);
  };

  // Edit Employee
  const editEmployeeHandler = (id) => {
    setEditEmployeePage(true);
    const selectEmployee = employeeData.filter(
      (employee) => employee._id === id
    );
    setSelectEditEmployee(selectEmployee[0]);
  };

  // After Employee Edited, update employeeData!
  const afterEditHandler = (editedData) => {
    const newData = employeeData.map((data) => {
      if (data._id === editedData._id) {
        console.log("it's me", data._id);
        return editedData;
      }
      return data;
    });
    setEmpoyeeData(newData);
  };

  // -----Delete Employee-----
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `${delete_api}/${id}`,
        { withCredentials: true }
      );
      console.log(response);

      setEmpoyeeData(employeeData.filter((employee) => employee._id !== id));
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
      }
    });
  };

  return (
    isAdmin && (
      <div className={styleCss.admin_container}>
        {/* Add Employee Button */}
        {!editEmployeePage && (
          <button
            className={styleCss.add_employee_button}
            onClick={() => {
              setAddEmployeePage(!addEmployeePage);
              setEditEmployeePage(false);
            }}
          >
            {addEmployeePage ? "Go Back" : "Add New Employee"}
          </button>
        )}
        {/* Edit Employee Button */}
        {editEmployeePage && (
          <button
            className={styleCss.add_employee_button}
            onClick={() => {
              setAddEmployeePage(false);
              setEditEmployeePage(!editEmployeePage);
            }}
          >
            Go Back
          </button>
        )}
        {!addEmployeePage && !editEmployeePage && (
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className={styleCss.page_refresh_button}
            onClick={() => {}}
          />
        )}
        {!addEmployeePage && !editEmployeePage && (
          <div className={styleCss.employee_table_container}>
            <div className={styleCss.show_total_employee}>
              Total Employee:{" "}
              <input type="number" readOnly value={employeeData.length} />
            </div>
            <table className={styleCss.employee_table}>
              {/* Table Head */}
              <thead className={styleCss.employee_table_head}>
                <tr>
                  <th>Sl. No.</th>
                  <th>ID</th>
                  <th>Name</th>
                  {/* <th>Shift</th> */}
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
                    <tr key={employee._id || i + 1}>
                      <td>{i + 1}</td>
                      <td>{employee.userid || "NA"}</td>
                      <td>{employee.firstname + " " + employee.lastname}</td>
                      {/* <td>{employee.shift}</td> */}
                      <td>{employee.gender}</td>
                      <td>
                        <img
                          src={
                            employee.avatar
                              ? employee.avatar.secure_url
                              : "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                          }
                          alt=""
                          height="50px"
                        />
                      </td>
                      <td>{employee.dob}</td>
                      <td>{employee.hiredate}</td>
                      <td>
                        <button
                          className={styleCss.edit_button}
                          onClick={() => {
                            editEmployeeHandler(employee._id);
                          }}
                        >
                          Edit✏️
                        </button>
                      </td>
                      <td>
                        <button
                          className={styleCss.delete_button}
                          onClick={() => {
                            deleteHandler(employee._id);
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
        {addEmployeePage && (
          <AddEmployee afterAddEmployeeHandler={afterAddEmployeeHandler} />
        )}
        {editEmployeePage && (
          <EditEmployee
            selectEditEmployee={selectEditEmployee}
            afterEditHandler={afterEditHandler}
          />
        )}
      </div>
    )
  );
};

export default Admin;
