import React, { useEffect, useRef, useState } from 'react'
import "../../assets/css/sign.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import {Link, useNavigate} from "react-router-dom";
import { FaEye } from 'react-icons/fa6';
import axios from 'axios';
import { errorMsgs, successMsg } from '../utils/utils';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {
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
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      if (email.trim() !== "" && password.trim() !== "") {
        const res = await axios.put(`https://minningapp.onrender.com/api/user/`, {
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
        // console.log(error.);
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
    <div className='sign'>
      <ToastContainer/>
    <form action="" className='signin' onSubmit={signIn}>
    <h1>Hi, Welcome Back</h1>
    <div className="rows">
        <label htmlFor="email">Email Address</label>
        <div className="box">
            <BsEnvelope className='icon'/>
            <input type="email" id='email'name='email' placeholder='Enter Emial'/>
        </div>
        <label htmlFor="password">Password</label>
        <div className="box">
            <CiLock className='icon'/>
            <input type="password" id='password'name='password' placeholder='Enter Emial' ref={passwordRef}/>
            <FaEye className="icon eye" onClick={changePassVis} />
        </div>
        <p>By signing in, you confirm that you have read and accepted our <a href="#" target='_blank'>Terms & Condition</a></p>
      <p>Don't have an account yet? <Link to="/sign">Sign up</Link></p>
        <button>Login</button>
    </div>
</form>
</div>
  )
}

export default Login