import React, { useEffect, useState } from "react";
import axios from "axios";
import headphones from "../Resources/Img/headphones.jpg";
import Card from "../Components/Card.js";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProducts(res.data);
  };

  //a revoir
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (!isChecked) {
      setFilterCategories(value);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div>
        <Dropdown className="m-3">
          <Dropdown.Toggle id="dropdown-basic">
            Filtrer par catégorie
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Form>
              {categories.map((category, index) => (
                <div>
                  <Form.Check
                    type="switch"
                    id={category.tag}
                    name={category}
                    value={category.tag}
                    key={index}
                    label={category.tag}
                    onClick={(e) => handleChange(e)}
                  />
                </div>
              ))}
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <div className="d-flex flex-wrap align-content-around justify-content-center col">
          {products.map((product, index) => (
            <Card product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
