import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card.js";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import banner from "../Resources/Img/banner.jpg";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState([false]);
  const [selectedCategories, setSelectedCategories] =
    useState("All categories");

  useEffect(() => {
    loadProducts();
    loadCategories();
    getToken();
  }, []);

  const getToken = () => {
    const token = Cookies.get("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProductsList(res.data);
  };

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const onCategoryChange = (e) => {
    if (e.target.checked) {
      setSelectedCategories(e.target.value);
    } else if (!e.target.checked) {
      setSelectedCategories("All categories");
    }
  };

  const filteredItems =
    selectedCategories === "All categories"
      ? productsList
      : productsList.filter((item) => item.category === selectedCategories);

  return (
    <div>
      <div
        className="banner"
        style={{
          minHeight: "250px",
          color: "white",
          backgroundImage: `url(${banner})`,
        }}
      >
        <h2 className="display-2 fst-italic">A STORE.</h2>
        <h2 className="display-2 fst-italic">EVERYTHING.</h2>
        <h2 className="display-2 fst-italic">FOR EVERYONE.</h2>
      </div>
      <div className="container-fluid">
        <div>
          <Dropdown className="m-3">
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "#FF773D",
                borderColor: "#FF773D",
              }}
            >
              Filtrer par catégorie
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form>
                <Form.Check>
                  {categories.map((category, index) => (
                    <div>
                      {selectedCategories !== category.tag &&
                      selectedCategories !== "All categories" ? (
                        <Form.Check
                          disabled
                          type="switch"
                          id={category.tag}
                          name={category}
                          value={category.tag}
                          key={index}
                          label={category.tag}
                          onChange={(e) => onCategoryChange(e)}
                        />
                      ) : (
                        <Form.Check
                          type="switch"
                          id={category.tag}
                          name={category}
                          value={category.tag}
                          key={index}
                          label={category.tag}
                          onChange={(e) => onCategoryChange(e)}
                        />
                      )}
                    </div>
                  ))}
                </Form.Check>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="d-flex flex-wrap align-content-around justify-content-center col">
            {filteredItems.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
