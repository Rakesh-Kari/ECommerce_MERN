import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserDetailsSlice } from "./redux/UserSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserDetailsSlice());
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-100px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
