import React from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserDetailsSlice } from "../redux/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const userOneDetails = useSelector((state) => state.users.userDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data,
        { withCredentials: true }
      );

      const responseData = response.data;
      if (response.status === 200) {
        dispatch(UserDetailsSlice());
        navigate("/");
      }

      console.log("The response is:", response);

      console.log(responseData);

      return responseData;
    } catch (err) {
      console.error("The error message is:", err.response.data.message);
    }
  };

  return (
    <div>
      <div className="container mx-10 p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto py-5 rounded">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 " onSubmit={handleSubmit}>
            <div className="grid">
              <label> Email : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="email"
                  type="email"
                  value={data.email}
                  placeholder="Please enter your email"
                  className="w-full h-full outline-none bg-transparent ml-2"
                />
              </div>
            </div>
            <div className="grid">
              <label> Password : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  placeholder="Please enter your password"
                  className="w-full h-full outline-none bg-transparent ml-2"
                />
                <div
                  className="cursor-pointer flex items-center mr-2"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  <span> {showPassword ? <IoMdEyeOff /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline hover:text-red-600"
              >
                Forgot Password
              </Link>
            </div>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mt-4 hover:bg-green-200 hover:text-black">
                Login
              </button>
            </div>
          </form>
          <p className="flex mt-4">
            Don't have an account ?{" "}
            <Link to="/sign-up">
              <div className="ml-2 cursor-pointer text-red-200 hover:underline hover:text-red-600 ">
                Sign Up
              </div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
