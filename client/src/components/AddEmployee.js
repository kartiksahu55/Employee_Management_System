import React, { useEffect, useRef, useState } from "react";
import styleCss from "./AddEmployee.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const AddEmployee = ({ afterAddEmployeeHandler }) => {
  const employeeDataStructure = {
    avatar_url: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    userid: "",
    gender: "",
    dob: "",
    hiredate: "",
    password: "12345678",
  };
  const [newEmployeeData, setNewEmployeeData] = useState(employeeDataStructure);

  const createEmployeeFormHandler = async (event) => {
    event.preventDefault();

    // Define sweetalert2
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    // Add Employee
    try {
      console.log(newEmployeeData);
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        newEmployeeData
      );

      console.log(response.data.user);

      Toast.fire({
        icon: "success",
        title: "New employee added successfully!",
      });

      afterAddEmployeeHandler(response.data.user);
      setNewEmployeeData(employeeDataStructure);
    } catch (error) {
      console.log(error);
      if (!error.response) {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    }
  };

  // Input Field get focus on component load
  // const textinput = useRef(null);
  // useEffect(() => {
  //   textinput.current.focus();
  // });

  return (
    <div className={styleCss.new_employee_main_container}>
      <h2>New Employee</h2>
      <div className={styleCss.new_employee_container}>
        <div className={styleCss.new_employee_photo_upload}>
          <img
            src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
            alt=""
          />
          <input
            type="file"
            accept="image/"
            name="photo"
            placeholder="Upload Photos"
            value={newEmployeeData.avatar_url}
            onChange={(event) => {
              setNewEmployeeData({
                ...newEmployeeData,
                avatar_url: event.target.value,
              });
            }}
          />
        </div>

        {/* -----Form to create new employee----- */}
        <form
          className={styleCss.new_employee_add_form}
          onSubmit={createEmployeeFormHandler}
        >
          <div className={styleCss.new_employee_add_form_wrapper}>
            <label htmlFor="fName">
              <div>
                First Name <span>*</span>
              </div>
              <input
                type="text"
                id="fName"
                name="fName"
                // ref={textinput}
                required
                value={newEmployeeData.firstname}
                placeholder="hector"
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    firstname: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="lName">
              <div>
                Last Name <span>*</span>
              </div>
              <input
                type="text"
                id="lName"
                name="lName"
                required
                placeholder="evans"
                value={newEmployeeData.lastname}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    lastname: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className={styleCss.new_employee_add_form_wrapper}>
            <label htmlFor="email">
              <div>
                Email <span>*</span>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="example@email.com"
                value={newEmployeeData.email}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    email: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="pNumber">
              <div>Phone</div>
              <input
                type="number"
                id="pNumber"
                name="pNumber"
                placeholder="+91"
                value={newEmployeeData.phone}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    phone: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className={styleCss.new_employee_add_form_wrapper}>
            <label htmlFor="employeeId">
              <div>
                Employee Id <span>*</span>
              </div>
              <input
                type="number"
                id="employeeId"
                name="employeeId"
                required
                placeholder="012345"
                value={newEmployeeData.userid}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    userid: e.target.value,
                  })
                }
              />
            </label>

            <label htmlFor="gender">
              <div>
                Gender <span>*</span>
              </div>
              <select
                name="gender"
                id="gender"
                required
                value={newEmployeeData.gender}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    gender: e.target.value,
                  })
                }
              >
                <option value="">Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className={styleCss.new_employee_add_form_wrapper}>
            <label htmlFor="dob">
              <div>
                Date of Birth <span>*</span>
              </div>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                value={newEmployeeData.dob}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    dob: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="hireDate">
              <div>
                Date of Hire <span>*</span>
              </div>
              <input
                type="date"
                id="hireDate"
                name="hireDate"
                required
                value={newEmployeeData.hiredate}
                onChange={(e) =>
                  setNewEmployeeData({
                    ...newEmployeeData,
                    hiredate: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <button type="submit">Create Employee</button>
        </form>
        <p>Default Password: 12345678</p>
      </div>
    </div>
  );
};

export default AddEmployee;
