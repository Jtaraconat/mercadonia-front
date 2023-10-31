import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SearchProduct() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [dataURI, setDataURI] = useState("");
  const [searchedProduct, setSearchedProduct] = useState("");
  const [foundProduct, setFoundProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [productVisibility, setProductVisibility] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const loadProduct = async () => {
    const res = await axios
      .get(`http://localhost:8080/products`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (searchedProduct == response.data[i].name) {
            const result = axios
              .get(`http://localhost:8080/product/${response.data[i].id}`)
              .then((response) => {
                setFoundProduct(response.data);
                setProductVisibility(!productVisibility);
              });
          }
        }
      });
  };

  const onSearchInput = (e) => {
    setSearchedProduct(e.target.value);
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    if (searchedProduct.length == 0) {
      alert("Veuillez entrer un produit");
    }
    await loadProduct();
  };

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    productCategory: "",
    image: "",
  });

  const onInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      image: dataURI,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/product/${productId}`, product);
    navigate("/admin");
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file) => {
    if (!file) {
      setDataURI("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataURI(dataUri);
    });
  };

  return (
    <div className="container-fluid shadow p-3 mb-5 bg-white rounded">
      <button
        className="btn btn-primary mb-2 d-flex align-self-start"
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
            <div className="from-control">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={onSubmitSearch}
              >
                Rechercher le produit
              </button>
            </div>
          </div>
        </form>
      </div>

      {productVisibility ? (
        <div className="form-group mb-3">
          <Card product={foundProduct} />
          <div className="from-control d-flex justify-content-evenly">
            <Link type="button" className="btn btn-danger mt-2" to="/admin">
              Annuler
            </Link>
            <Link
              type="submit"
              className="btn btn-primary mt-2"
              to={`admin/editproduct/${foundProduct.id}`}
            >
              Modifier le produit
            </Link>
            <Link type="submit" className="btn btn-success mt-2">
              Promotions
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

/* <>
          {productVisibility ? (
            <div>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="custom-file mb-5 d-flex flex-column">
                  <label className="custom-file-label text-uppercase font-weight-bold">
                    Ajouter une image
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    name="image"
                    onChange={(e) => onChange(e.target.files[0] || null)}
                  />
                </div>
                <div className="form-group mb-5">
                  <img
                    src={foundProduct.image}
                    alt="Image produit manquante"
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    className="m-3"
                  ></img>
                  <img
                    src={dataURI}
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    alt="Selectionnez une image"
                    className="m-3"
                  ></img>
                </div>
                <div className="form-group mb-5">
                  <label className="text-uppercase font-weight-bold">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="nom du produit"
                    value={foundProduct.name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-5">
                  <label className="text-uppercase font-weight-bold">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameUpdate"
                    placeholder="nom du produit"
                    value={product.name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-5">
                  <label className="text-uppercase font-weight-bold">
                    Description
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="description"
                    placeholder="description"
                    rows="4"
                    value={foundProduct.description}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-5">
                  <label className="text-uppercase font-weight-bold">
                    Prix
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    placeholder="prix en €"
                    value={foundProduct.price}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group mb-5 d-flex flex-column">
                  <label
                    className="text-uppercase font-weight-bold"
                    defaultValue={""}
                  >
                    Selectionner une catégorie
                  </label>
                  <select
                    className="custom-select custom-select-lg mb-5"
                    onChange={(e) => onInputChange(e)}
                    name="productCategory"
                    value={foundProduct.productCategory}
                  >
                    {categories.map((category, index) => (
                      <option category={category} key={index}>
                        {category.tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <div className="from-control d-flex justify-content-evenly">
                    <button type="button" className="btn btn-danger mt-2">
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary mt-2">
                      Modifier le produit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}{" "}
        </>
        */
