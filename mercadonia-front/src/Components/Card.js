import React from "react";
import headphones from "../Resources/Img/headphones.jpg";

export default function Card({ product, index }) {
  return (
    <div className="card">
      <img
        className="card-img-top img-thumbnail"
        src={headphones}
        alt={"headphones.jpg"}
        style={{
          maxWidth: 300,
          maxHeight: 250,
        }}
      />
      <div className="card-body border shadow" key={index}>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-price">{product.price + " €"}</p>
      </div>
    </div>
  );
}
