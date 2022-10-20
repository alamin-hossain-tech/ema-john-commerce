import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    // console.log(storedCart);
    for (const id in storedCart) {
      const addededProduct = products.find((product) => product.id === id);
      if (addededProduct) {
        const quantity = storedCart[id];
        addededProduct.quantity = quantity;
        savedCart.push(addededProduct);
      }
    }
    setCart(savedCart);
  }, [products]);
  // console.log(products);
  function compareName(a, b) {
    // converting to uppercase to have case-insensitive comparison
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  products.sort(compareName);

  // console.log(sortProducts);
  const lessProduct = products.slice(0, 50);

  const addToCart = (selectedProduct) => {
    const exists = cart.find((product) => product.id === selectedProduct.id);

    let newCart = [];
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  const deleteShoppingCart = () => {
    localStorage.removeItem("shopping-cart");
    // window.location.reload(false);
    // let newCart = [];
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
        <div className="products-grid">
          {lessProduct.map((product) => (
            <Product
              product={product}
              key={product.id}
              addToCart={addToCart}
              deleteShoppingCart={deleteShoppingCart}
            ></Product>
          ))}
        </div>
      </div>
      <div className="shop-summery">
        <Cart cart={cart} deleteShoppingCart={deleteShoppingCart}>
          <div
            className={
              cart.length === 0
                ? "hidden-orders-container"
                : "orders-container-shop"
            }
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {cart.map((product) => (
              <ReviewItem
                key={product.id}
                product={product}
                deleteItem={deleteItem}
              ></ReviewItem>
            ))}
            {/* {cart.length === 0 && element_do("orders-container-shop", "none")} */}
          </div>
          {
            <Link to="/orders">
              <button className="btn-clear" style={{ marginTop: "10px" }}>
                Proceed to checkout
              </button>
            </Link>
          }
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
