import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { getUserDetails } from "../redux/UserSlice";
import AllUsers from "./AllUsers";
import ChangeUserRole from "../components/ChangeUserRole";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.users.userDetails);

  const tokenUserDetails = userDetails && userDetails.user;

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const firstUserDetail =
    Array.isArray(tokenUserDetails) && tokenUserDetails.length > 0
      ? tokenUserDetails[0]
      : null;

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {firstUserDetail?.profilePic ? (
              <img
                src={firstUserDetail?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={firstUserDetail?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">
            {firstUserDetail?.name}
          </p>
          <p className="text-sm">{firstUserDetail?.role}</p>
        </div>

        <div>
          <nav className="grid p-4">
            <Link
              to="/admin-panel/all-users"
              className="px-2 py-1 hover:bg-slate-100"
            >
              All Users
            </Link>
            <Link
              to="/admin-panel/all-products"
              className="px-2 py-1 hover:bg-slate-100"
            >
              All product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
