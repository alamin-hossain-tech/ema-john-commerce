import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // const location = useLocation();
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        form.reset();
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-tittle">Please Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" />
        </div>
        <p className="error">{error}</p>
        <div className="form-control submit-btn">
          <input type="submit" />
        </div>
        <p>
          New to this site? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
