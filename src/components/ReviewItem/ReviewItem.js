import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewItem.css";

const ReviewItem = ({ product, deleteItem }) => {
  console.log(product);
  const { name, price, quantity, img, id } = product;
  return (
    <div className="review-box">
      <div className="review-img">
        <img src={img} alt="" />
      </div>
      <div className="review-info">
        <div className="review-product-info">
          <h3>{name}</h3>
          <h4>Price: ${price}</h4>
          <p>Quantity:{quantity}</p>
        </div>
        <div className="review-remove-box">
          <button onClick={() => deleteItem(id)}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
