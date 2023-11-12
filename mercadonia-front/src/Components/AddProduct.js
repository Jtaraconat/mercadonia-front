import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [dataURI, setDataURI] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, [categories]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const { name, description, price, category, image } = product;
  const onInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      image: dataURI,
    });
  };

  const [newCategory, setNewCategory] = useState({
    tag: "",
  });

  const onNewCategoryInputChange = (e) => {
    setNewCategory({ tag: e.target.value });
  };

  const addCategory = async () => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].tag == newCategory.tag) {
        alert("La catégorie existe déjà");
        return;
      }
    }
    if (newCategory.tag.length === 0) {
      alert("saisir un nom pour la catégorie");
    } else {
      const res = await axios.post(
        `http://localhost:8080/category`,
        newCategory
      );
      handleClose();
    }
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      product.name === "" ||
      product.description === "" ||
      product.image === "" ||
      product.category === "" ||
      product.price === 0
    ) {
      alert("Un ou plusieurs champ(s) manquant(s)");
      return;
    }
    await axios.post("http://localhost:8080/product", product);
    navigate("/admin");
  };

  return (
    <div className="container-fluid shadow p-3 mb-5 bg-white rounded shadow">
      <button
        className="btn btn-danger mb-2 d-flex align-self-start"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
      <h1 className="mb-5 text-uppercase">Ajouter un produit</h1>

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
        <div>
          <img
            src={dataURI}
            style={{
              maxWidth: 300,
              maxHeight: 300,
            }}
            alt="image produit"
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
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-5">
          <label className="text-uppercase font-weight-bold">Description</label>
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
        <div className="form-group mb-5">
          <label className="text-uppercase font-weight-bold">Prix</label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="prix en €"
            value={price}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-5 d-flex flex-column">
          <label className="text-uppercase font-weight-bold" defaultValue={""}>
            Selectionner une catégorie
          </label>
          <>
            <Button variant="primary" onClick={handleShow}>
              Ajouter une catégorie
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter une catégorie</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  className="form-control"
                  name="newCategory"
                  placeholder="Nom de la catégorie"
                  value={newCategory.tag}
                  onChange={(e) => onNewCategoryInputChange(e)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={addCategory}>
                  Ajouter
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Annuler
                </Button>
              </Modal.Footer>
            </Modal>
          </>

          <select
            className="custom-select custom-select-lg mb-5"
            onChange={(e) => onInputChange(e)}
            name="category"
            value={category}
          >
            <option>Sélectionner une catégorie</option>

            {categories.map((category, index) => (
              <option category={category} key={index}>
                {category.tag}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <div className="from-control d-flex justify-content-end ">
            <button type="submit" className="btn btn-success mt-2 ">
              Ajouter le produit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
