import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SearchProduct() {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [searchedInput, setsearchedInput] = useState("");
  const [productsList, setProductsList] = useState("");
  const [foundProduct, setFoundProduct] = useState([]);
  const DB_URI = "https://mercadona-backend-fca430085216.herokuapp.com";

  const [productVisibility, setProductVisibility] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    const res = await axios.get(`${DB_URI}/categories`);
    setCategories(res.data);
  };

  const loadProducts = async () => {
    const res = await axios.get(`${DB_URI}/products`);
    setProductsList(res.data);
  };

  const onSearchInput = (e) => {
    setsearchedInput(e.target.value);
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    await loadProducts();
    if (searchedInput === "") {
      alert("Entrer un produit");
      setProductVisibility(false);
      return;
    }
    const filterBySearch = productsList.filter((item) => {
      if (item.name.toLowerCase().includes(searchedInput.toLowerCase())) {
        setProductVisibility(true);
        return item;
      }
    });
    setFoundProduct(filterBySearch);
  };

  return (
    <div className="container-fluid shadow p-3 mb-5 bg-white rounded">
      <button
        className="btn btn-danger mb-2 d-flex align-self-start"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
      <div>
        <form>
          <div className="form-group mb-3">
            <div className="from-control">
              <label>Rechercher un produit</label>
              <input
                type="text"
                className="form-control"
                name="searchedProduct"
                placeholder="nom du produit"
                onChange={onSearchInput}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <div className="from-control d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-success mt-2 "
                onClick={onSubmitSearch}
              >
                Rechercher le produit
              </button>
            </div>
          </div>
        </form>
      </div>

      {productVisibility ? (
        <div>
          <div
            className="form-group mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            {foundProduct.map((product, index) => (
              <div className="from-control d-flex flex-column ">
                <Card product={product} key={index} />

                <Link
                  type="submit"
                  className="btn btn-primary mt-2"
                  to={`${product.id}`}
                >
                  Modifier le produit
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
