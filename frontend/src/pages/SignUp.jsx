import React from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import ImageToBase64 from "../utils/ImageToBase64";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("The data before axios is", data);

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    console.log("Checking the image:");

    try {
      const imagePic = await ImageToBase64(file);
      console.log("The image pic is:", imagePic);
      setData((previous) => ({
        ...previous,
        profilePic: imagePic,
      }));
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast("Password and confirm password does not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data
      );
      console.log(response);
      toast(response.data.message);
      return response.data;
    } catch (err) {
      console.error("The error message is:", err);
    }
  };

  console.log("the data after calling axios", data);

  return (
    <div>
      <div className="container mx-10 p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto py-5 rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div className="">
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-center text-sm bg-slate-200 absolute bottom-0 bg-opacity-80 cursor-pointer">
                  Upload Photo
                </div>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleUploadPic}
                  required
                />
              </label>
            </form>
          </div>

          <form className="pt-6" onSubmit={handleSubmit}>
            <div className="grid my-2">
              <label> Name : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="name"
                  value={data.name}
                  type="text"
                  placeholder="Please enter your email"
                  className="w-full h-full outline-none bg-transparent ml-2"
                  required
                />
              </div>
            </div>
            <div className="grid my-2">
              <label> Email : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="email"
                  type="email"
                  value={data.email}
                  placeholder="Please enter your email"
                  className="w-full h-full outline-none bg-transparent ml-2"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label> Password : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your password"
                  required
                  className="w-full h-full outline-none bg-transparent ml-2"
                />
                <div
                  className="cursor-pointer flex items-center mr-2"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  <span> {showPassword ? <IoMdEyeOff /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid">
              <label> Confirm Password : </label>
              <div className="bg-slate-200 flex h-10 ">
                <input
                  onChange={handleOnChange}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Please re-enter your password"
                  className="w-full h-full outline-none bg-transparent ml-2"
                />
                <div
                  className="cursor-pointer flex items-center mr-2"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                >
                  <span>
                    {" "}
                    {showConfirmPassword ? <IoMdEyeOff /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mt-4 hover:bg-green-200 hover:text-black"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="flex mt-4">
            Already have an account?{" "}
            <Link to="/login">
              <div className="ml-2 cursor-pointer text-red-200 hover:underline hover:text-red-600 ">
                Login
              </div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
