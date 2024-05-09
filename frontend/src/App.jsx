import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { UserDetailsSlice } from "./redux/UserSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(UserDetailsSlice());
  // }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/details"
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
