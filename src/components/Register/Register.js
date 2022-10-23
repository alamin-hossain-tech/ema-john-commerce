import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Register.css";

const Register = () => {
  const [error, setError] = useState(null);

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    }
    if (password.length < 6) {
      setError("password can not be less than 6");
      return;
    }
    console.log("submit clicked", email, password, confirm);

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => {
        console.log("error: ", error);

        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setError("Email Already in Use.");
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-tittle">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="confirm" id="" />
        </div>
        <p className="error">{error}</p>
        <div className="form-control submit-btn">
          <input type="submit" />
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
