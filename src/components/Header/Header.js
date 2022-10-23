import userEvent from "@testing-library/user-event";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="sticky-header">
      <header>
        <div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li style={{ color: "#FFF" }}>{user?.email}</li>
              {user?.uid ? (
                <li>
                  <Link onClick={logOut}>Logout</Link>
                </li>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
