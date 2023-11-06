import headphones from "../Resources/Img/headphones.jpg";
import React, { useEffect, useState } from "react";

export default function Card({ product, index }) {
  const [promoVisibility, setPromoVisibility] = useState(false);
  let timestamp;

  const getCurrentDate = () => {
    const newDate = new Date();
    timestamp = newDate.getTime();
    console.log(timestamp);
  };

  useEffect(() => {
    getCurrentDate();
    isProductPromo();
  }, []);

  const isProductPromo = () => {
    if (timestamp >= product.promoStart && timestamp <= product.promoEnd) {
      setPromoVisibility(true);
    } else if (timestamp == 0 && timestamp == 0) {
      setPromoVisibility(false);
    } else {
      setPromoVisibility(false);
    }
  };

  return (
    <div
      className="card m-2"
      style={{
        maxWidth: 250,
      }}
    >
      <img
        className="card-img-top img-thumbnail"
        src={`${product.image}`}
        alt={product.image}
        style={{
          width: 250,
          height: 250,
        }}
      />
      <div className="card-body border shadow" key={index}>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        {promoVisibility ? (
          <div className="d-flex align-items-center justify-content-around">
            <p>
              <s>ancien prix: {product.price} €</s>
            </p>
            <p
              className="card-price display-6"
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {product.promoPrice + " €"}
            </p>
          </div>
        ) : (
          <div>
            <p className="card-price">{product.price + " €"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
