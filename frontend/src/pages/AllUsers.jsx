import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/UserSlice";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const dispatch = useDispatch();
  const alldetails = useSelector((state) => state.users.allDetails);

  const [updateRole, setUpdateRole] = useState(false);
  const [userDetailsChanged, setUserDetailsChanged] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
  });

  console.log("before:", updateUserDetails);

  const handleUserDetailsChange = () => {
    setUserDetailsChanged((previous) => !previous);
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch, userDetailsChanged]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-black text-white">
            <th className="border border-gray-300 px-4 py-2">Sr.</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Created Date</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {alldetails &&
            alldetails.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.createdAt}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center ">
                  <button
                    className="cursor-pointer bg-green-100 rounded-full px-2 py-1 hover:bg-green-400 "
                    onClick={() => {
                      setUpdateRole(true);
                      setUpdateUserDetails(user);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {updateRole && (
        <ChangeUserRole
          onClose={() => {
            setUpdateRole(false);
            handleUserDetailsChange();
          }}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
        />
      )}
    </div>
  );
};

export default AllUsers;
