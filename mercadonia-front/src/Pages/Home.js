import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProducts(res.data);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col col-sm-3 border">categories</div>
        <div className="d-flex flex-wrap align-content-around justify-content-center col">
          {products.map((product, index) => (
            <div className="p-2 " key={index}>
              <div className="card">
                <img
                  className="card-img-top"
                  src="{product.image}"
                  alt="Card image cap"
                />
                <div className="card-body border shadow" key={index}>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
/*
<div className="container">
      <div className="py-4">
        {products.map((product, index) => {
          <div className="card">
            <img
              className="card-img-top"
              src="{product.image}"
              alt="Card image cap"
            />
            <div className="card-body border shadow" key={index}>
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
*/
