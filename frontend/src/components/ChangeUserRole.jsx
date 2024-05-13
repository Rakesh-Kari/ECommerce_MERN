import React, { useState } from "react";
import { IoMdExit } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeUserRole = ({ name, email, role, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ROLE = {
    ADMIN: "ADMIN",
    GENERAL: "GENERAL",
  };

  const [userRole, setUserRole] = useState(role);

  const handleOnChange = (e) => {
    setUserRole(e.target.value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/update-user",
        { name, email, role: userRole },
        { withCredentials: true }
      );
      console.log("The user role has been updated", response.data);
      toast(response.data.message);
      dispatch(getUserDetails);
      onClose();
      return response.data;
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-30">
      <div className="bg-white shadow-md p-4 w-full max-w-sm text-center">
        <button onClick={onClose} className="cursor-pointer ">
          <IoMdExit className="block ml-auto cursor-pointer" />
        </button>

        <h1 className="text-xl">Change User Role</h1>
        <p className="mt-3">Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-8 mx-auto">
          <p>Role: </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChange}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-fit border rounded-full px-4 py-2 bg-red-500 text-white mt-3"
          onClick={onHandleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
