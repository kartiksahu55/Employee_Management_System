import React, { useState } from "react";
import styleCss from "./AddEmployee.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const EditEmployee = ({ selectEditEmployee, afterEditHandler }) => {
  const [loader, setLoader] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(selectEditEmployee);
  const [selectedImage, setSelectedImage] = useState(
    selectEditEmployee.avatar.secure_url
  );

  // Edit Employee
  const patchEmployee = async (Toast) => {
    try {
      // Add Image to Object File
      const payload = { ...editEmployeeData, avatarfile: selectedImage };
      setLoader(true)
      // Upload and update Employee Date
      const response = await axios.patch(
        `http://localhost:4000/api/user/update/${editEmployeeData._id}`,
        payload,
        { withCredentials: true }
      );
      Toast.fire({
        icon: "success",
        title: "Updated Successfully!",
      });
      if (response.data.doc) {
        afterEditHandler(response.data.doc);
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(false)
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

  const editEmployeeFormHandler = async (event) => {
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

    Swal.fire({
      title: "Confirm!",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        patchEmployee(Toast);
      }
    });

    // // Edit Employee

    // console.log(editEmployeeData);
  };

  // Image File Input And Preview
  const previewAvatarFile = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const imageInputHandler = (event) => {
    const image = event.target.files[0];
    console.log(image);
    if (!image) {
      setSelectedImage("");
      return;
    }
    previewAvatarFile(image);
  };

  return (
    <div>
      <div className={styleCss.new_employee_main_container}>
        <h2>Edit Employee</h2>
        <div className={styleCss.new_employee_container}>
          <div className={styleCss.new_employee_photo_upload}>
            <img
              src={
                selectedImage ||
                selectEditEmployee.avatar.secure_url ||
                "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
              }
              alt=""
            />
            <input
              type="file"
              id="imageInput"
              name="image"
              placeholder="Upload Photos"
              onChange={imageInputHandler}
            />
          </div>

          {/* -----Form to create new employee----- */}
          <form
            className={styleCss.new_employee_add_form}
            onSubmit={editEmployeeFormHandler}
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
                  value={editEmployeeData.firstname}
                  placeholder="hector"
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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
                  value={editEmployeeData.lastname}
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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
                  value={editEmployeeData.email}
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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
                  value={editEmployeeData.phone}
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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
                  min="6"
                  required
                  placeholder="012345"
                  value={editEmployeeData.userid}
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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
                  value={editEmployeeData.gender}
                  onChange={(e) =>
                    setEditEmployeeData({
                      ...editEmployeeData,
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

            {!loader && <button type="submit">Edit Employee</button>}
            {loader && <span className={styleCss.loader}></span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
