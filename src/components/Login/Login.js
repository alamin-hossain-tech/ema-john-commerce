import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="form-container">
      <h2 className="form-tittle">Please Login</h2>
      <form>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" />
        </div>
        <div className="form-control submit-btn">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
