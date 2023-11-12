import React, { useEffect, useState } from "react";

export default function Card({ product, index }) {
  const [promoVisibility, setPromoVisibility] = useState(false);
  let timestamp;

  const getCurrentDate = () => {
    const newDate = new Date();
    timestamp = newDate.getTime();
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
          width: 300,
          height: 250,
        }}
      />
      <div className="card-body border shadow d-flex flex-column" key={index}>
        <h5 className="card-title text-uppercase">{product.name}</h5>

        {promoVisibility ? (
          <div className="d-flex align-items-center justify-content-between">
            <s className="fst-italic fw-light">
              ancien prix: {product.price} €
            </s>

            <p
              className="card-price display-6 fw-bold"
              style={{
                color: "red",
              }}
            >
              {product.promoPrice + " €"}
            </p>
          </div>
        ) : (
          <div>
            <p className="card-price fs-4">{product.price + " €"}</p>
          </div>
        )}
        <p className="card-text card-footer p-0">{product.description}</p>
      </div>
    </div>
  );
}
