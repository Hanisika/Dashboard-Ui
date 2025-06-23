import React, { useState } from "react";
import './loginPage.css';
import { useNavigate } from "react-router-dom";
import {
loginUser
} from '../../api/orderService';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(email, password);
    console.log("✅ Login Success:", res);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', res.email);
    navigate('/');
  } catch (err) {
    console.error("❌ Login Failed:", err.response?.data);
    alert(err.response?.data?.message || 'Login failed');
  }
};



  return (
    <div className="login">
      <div className="title">
        <h3>Sign in to access your dashboard</h3>
      </div>
     <form action="" onSubmit={handleLogin} >
        <label htmlFor="Email">Email Address</label>
        <div className='input-wrapper'>
             <input  type="text" name="Email" placeholder='Enter Email Address' className='input-filed' value={email}
          onChange={(e) => setEmail(e.target.value)} required/>
        {/* <i className="bi bi-envelope"></i> */}
        </div>
         
        <label htmlFor="Password">Password</label>
        <div className='input-wrapper'>
        <input type="password" name='password' placeholder='Enter Password' className='password-field' value={password}
          onChange={(e) => setPassword(e.target.value)} required/>
         {/* <i className=" bi bi-lock"></i> */}
        </div>
        <p className='forgot password'> forgot password</p>
        <div>
           <input type="checkBox" name="Remeber me for 30 days" className='checkbox' />  
              <label className="form-check-label" >Remeber me on 30 days</label>
        </div>
      
        <button className='login-button'>Login </button>

         <p className='sign-page'>Don't have an Account? SignUp Now</p>
      </form>
      </div>
  
  );
};

export default LoginPage;
