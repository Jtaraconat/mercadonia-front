import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    productCategory: "",
    image: "",
  });

  const { name, description, price, productCategory, image } = product;
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <button
        className="btn btn-primary mb-2 d-flex align-self-start"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
      <form>
        <div className="form-group mb-3">
          <label>Nom du produit</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="nom du produit"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            type="textarea"
            className="form-control"
            name="description"
            placeholder="description"
            rows="4"
            value={description}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Prix</label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="prix en €"
            value={price}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3 d-flex flex-column">
          <label defaultValue={""}>Selectionner une catégorie</label>
          <select
            className="custom-select custom-select-lg mb-3"
            onChange={(e) => onInputChange(e)}
            name="productCategory"
            value={productCategory}
          >
            {categories.map((category, index) => (
              <option category={category} key={index}>
                {category.tag}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-file mb-3">
          <input
            type="file"
            className="custom-file-input"
            name="image"
            value={image}
            onChange={(e) => onInputChange(e)}
          />
          <label className="custom-file-label">Ajouter une image</label>
        </div>

        <div className="form-group mb-3">
          <div className="from-control">
            <button type="submit" className="btn btn-primary mt-2">
              Ajouter le produit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
