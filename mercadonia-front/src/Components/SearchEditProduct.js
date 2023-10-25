import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import Headphones from "../Resources/Img/headphones.jpg";

export default function AddProductModal() {
  const [product, setProduct] = useState([]);

  const loadProduct = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProduct(res.data);
  };

  return <p>search</p>;
}
