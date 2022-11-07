import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";

const Orders = () => {
  const { initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);

  const deleteShoppingCart = () => {
    localStorage.removeItem("shopping-cart");
    setCart([]);
  };
  const deleteItem = (id) => {
    const remainingCart = cart.filter((product) => product._id !== id);
    removeFromDb(id);
    setCart(remainingCart);
  };

  return (
    <div className="shop-container">
      <div className="products-display">
        <div className="orders-container">
          {cart.map((product) => (
            <ReviewItem
              key={product._id}
              product={product}
              deleteItem={deleteItem}
            ></ReviewItem>
          ))}
          {cart.length === 0 && (
            <h2>
              No products added to cart.{" "}
              <Link to="/">Please shop atleast one</Link>
            </h2>
          )}
        </div>
      </div>
      <div className="shop-summery">
        <Cart cart={cart} deleteShoppingCart={deleteShoppingCart}>
          {
            <Link to="/shipping">
              <button className="btn-clear" style={{ marginTop: "10px" }}>
                Preceed to Shipping
              </button>
            </Link>
          }
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
