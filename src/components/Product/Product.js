import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCoffee } from "@fortawesome/free-solid-svg-icons";

const Product = ({ addToCart, product }) => {
  const { img, name, price, ratingsCount, seller } = product;
  // console.log(product);
  return (
    <div>
      <div className="product">
        <div className="feature-img">
          <img src={img ? img : "hello"} alt="" />
        </div>
        <div className="product-info">
          <h4>{name}</h4>
          <h5>Price: ${price} </h5>
          <p>Manufacturer: {seller}</p>
          <p>Rating: {ratingsCount}</p>
        </div>
        <button className="cart-btn" onClick={() => addToCart(product)}>
          Add to Cart{" "}
          <span style={{ paddingLeft: "10px" }}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Product;
