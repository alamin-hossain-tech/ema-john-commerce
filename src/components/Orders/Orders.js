import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Orders = () => {
  const { products, initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);

  const deleteShoppingCart = () => {
    localStorage.removeItem("shopping-cart");
    setCart([]);
  };
  const deleteItem = (id) => {
    const remainingCart = cart.filter((product) => product.id !== id);
    removeFromDb(id);
    setCart(remainingCart);
  };

  return (
    <div className="shop-container">
      <div className="products-display">
        <div className="orders-container">
          {cart.map((product) => (
            <ReviewItem
              key={product.id}
              product={product}
              deleteItem={deleteItem}
            ></ReviewItem>
          ))}
        </div>
      </div>
      <div className="shop-summery">
        <Cart cart={cart} deleteShoppingCart={deleteShoppingCart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
