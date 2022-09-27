import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  // console.log(products);

  const lessProduct = products.slice(0, 6);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    console.log(newCart);
  };
  return (
    <div className="shop-container">
      <div className="products-display">
        <div className="products-grid">
          {lessProduct.map((product) => (
            <Product
              product={product}
              key={product.id}
              addToCart={addToCart}
            ></Product>
          ))}
        </div>
        {/* <h1>Shop Archiever</h1> */}
      </div>
      <div className="shop-summery">
        <h1>Summery</h1>
        <p>{cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
