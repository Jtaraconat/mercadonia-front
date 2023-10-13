import React, { useEffect, useState } from "react";
import axios from "axios";
import headphones from "../Resources/Img/headphones.jpg";
import Card from "../Components/Card.js";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProducts(res.data);
    console.log(res);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col col-sm-3 border">categories</div>
        <div className="d-flex flex-wrap align-content-around justify-content-center col">
          {products.map((product, index) => (
            <Card product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
