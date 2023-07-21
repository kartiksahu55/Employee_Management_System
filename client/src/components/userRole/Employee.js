import React, { useState } from "react";
import styleCss from "./Employee.module.css";

const Employee = ({ isEmployee, userDataDB }) => {
  const [applyLeave, setApplyLeave] = useState(false);
  console.log(isEmployee);

  return (
    isEmployee && (
      <div className={styleCss.main_employee_container}>
        <div className={styleCss.employee_card}>
          <h2>Employee Card</h2>
          <p>
            <span>Name:</span>
            <span> {userDataDB.firstname + " " + userDataDB.lastname}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{userDataDB.email}</span>
          </p>
          <p>
            <span>Phone:</span>
            <span>{userDataDB.phone}</span>
          </p>
          <p>
            <span>Date of Birth:</span>
            <span>{userDataDB.dob}</span>
          </p>
          <p>
            <span>Date of Joining:</span>
            <span>{userDataDB.hiredate}</span>
          </p>
          {!applyLeave && (
            <button onClick={() => setApplyLeave(!applyLeave)}>
              Apply for Leave
            </button>
          )}
          {applyLeave && (
            <button onClick={() => setApplyLeave(!applyLeave)}>Submit</button>
          )}
        </div>
        {applyLeave && (
          <div className={styleCss.employee_container_textarea}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Write a leave application!"
            ></textarea>
          </div>
        )}
      </div>
    )
  );
};

export default Employee;
