import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="sticky-header">
      <header>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <Link to="/orders">Order</Link>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
