import React from "react";

import "./Cart.css";

const Cart = (props) => {
  const { cart, deleteShoppingCart, children } = props;

  let total = 0;
  let shipping = 0;
  let tax = 0;
  let grandTotal = 0;
  let quantity = 0;

  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  tax = +(total * 0.1).toFixed(2);
  grandTotal = total + shipping + tax;

  // console.log(cart);
  return (
    <div className="cart-flex">
      <div className="cart">
        <h2>Order Summery</h2>
        <div className="cart-info">
          <p>Selected Items: {quantity}</p>
          <p>Total Price: {total}</p>
          <p>Total Shipping Charge: {shipping}</p>
          <p>Tax: {tax}</p>
          <h4>Grand Total: {grandTotal}</h4>
        </div>
        <div className="cart-info cart-btn-flex">
          <button className="btn-clear" onClick={deleteShoppingCart}>
            Clear Cart
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Cart;
