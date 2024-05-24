import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/sign.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMsgs, successMsg } from "../utils/utils";

function Sign() {
  const passwordRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const changePassVis = (e) => {
    if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
    }
  };

  // SIGN UP
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      if (email.trim() !== "" && password.trim() !== "") {
        // console.log(e.target);
        const res = await axios.post(`https://minningapp.onrender.com/api/user/`, {
          email,
          password,
        });
        localStorage.setItem("token", res.data.jwt);
        successMsg(res.data.msg);
        clearTimeout(timer);
        setTimer(() =>
          setTimeout(() => {
            navigate("/");
          }, 5000)
        );
      } else {
        errorMsgs("Please fill all inputs");
      }
    } catch (error) {
      if (error.response.data.err) {
        errorMsgs(error.response.data.err);
      } else {
        console.log(error);
        errorMsgs("Server Error");
      }
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="sign">
      <ToastContainer />
      <form action="" className="signup" onSubmit={signUp}>
        <h1>Sign Up</h1>
        <div className="rows">
          <label htmlFor="email">Email Address</label>
          <div className="box">
            <BsEnvelope className="icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Emial"
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className="box">
            <CiLock className="icon" />
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter Password"
            />
            <FaEye className="icon eye" onClick={changePassVis} />
          </div>
          <p>
            By signing up, you confirm that you have read and accepted our{" "}
            <a href="#" target="_blank">
              Terms & Condition
            </a>
          </p>
          <p>
            Have an account Already? <Link to="/login">Login</Link>
          </p>
          <button>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default Sign;
