import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditProduct() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [dataURI, setDataURI] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const loadProduct = async () => {
    const res = await axios.get(`http://localhost:8080/product/${id}`);
    setProduct(res.data);
  };

  const deleteProduct = async (id) => {
    const res = axios.delete(`http://localhost:8080/product/${id}`);
    navigate("/admin");
  };

  useEffect(() => {
    loadCategories();
    loadProduct();
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
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
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
      setProduct({
        ...product,
        image: dataUri,
      });
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:8080/product/${id}`, product);

    navigate("/admin");
  };

  return (
    <div className="container-fluid shadow p-3 mb-5 rounded">
      <button
        className="btn btn-primary mb-2 d-flex align-self-start"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
      <h1 className="mb-5 text-uppercase">Modifier le produit</h1>

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
        <div className="d-flex justify-content-around mb-5">
          <img
            src={product.image}
            alt="aucune image pour ce produit"
            style={{
              maxWidth: 300,
              maxHeight: 300,
            }}
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
          <select
            className="custom-select custom-select-lg mb-5"
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

        <div className="form-group mb-3">
          <div className="from-control d-flex justify-content-around">
            <>
              <Button variant="danger" onClick={handleShow}>
                Supprimer le produit
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Supprimer le produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Etes vous sûr(e) de vouloir supprimer ce produit?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Supprimer
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Annuler
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
            <button className="btn btn-primary mt-2">
              Modifier le produit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
