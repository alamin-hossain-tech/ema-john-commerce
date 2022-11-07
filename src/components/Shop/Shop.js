import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);
  const pages = Math.ceil(count / size);
  console.log(pages);

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    const ids = Object.keys(storedCart);
    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("by ids", data);
        for (const id in storedCart) {
          const addededProduct = data.find((product) => product._id === id);
          if (addededProduct) {
            const quantity = storedCart[id];
            addededProduct.quantity = quantity;
            savedCart.push(addededProduct);
          }
        }
        setCart(savedCart);
      });
    // console.log(storedCart);
  }, [products]);
  // console.log(products);

  // console.log(sortProducts);
  const lessProduct = products;

  const addToCart = (selectedProduct) => {
    const exists = cart.find((product) => product._id === selectedProduct._id);

    let newCart = [];
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  const deleteShoppingCart = () => {
    localStorage.removeItem("shopping-cart");
    // window.location.reload(false);
    // let newCart = [];
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
        <div className="products-grid">
          {lessProduct.map((product) => (
            <Product
              product={product}
              key={product._id}
              addToCart={addToCart}
              deleteShoppingCart={deleteShoppingCart}
            ></Product>
          ))}
        </div>
        <div className="pagination">
          <p>
            Currently Selected Page: {page + 1} & size :{size}
          </p>
          {[...Array(pages).keys()].map((number) => (
            <button
              onClick={() => setPage(number)}
              className={page === number && "selected"}
            >
              {number + 1}
            </button>
          ))}
          <select
            onChange={(event) => setSize(event.target.value)}
            defaultValue="10"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
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
                key={product._id}
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
