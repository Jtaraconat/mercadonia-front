import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditProduct() {
  let navigate = useNavigate();
  let finalPrice = 0;
  let promoStartTimestamp;
  let promoEndTimestamp;
  const [categories, setCategories] = useState([]);
  const [dataURI, setDataURI] = useState("");
  const [show, setShow] = useState(false);
  const [promoPercentage, setPromoPercentage] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  const loadCategories = async () => {
    const res = await axios.get(`${DB_URI}/categories`);
    setCategories(res.data);
  };

  const loadProduct = async () => {
    const res = await axios.get(`${DB_URI}/product/${id}`);
    setProduct(res.data);
  };

  const deleteProduct = async (id) => {
    const res = axios.delete(`${DB_URI}/product/${id}`);
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
    category: "",
    image: "",
  });

  const { name, description, price, category, image } = product;
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

  const calcPromo = () => {
    const actualPrice = product.price;
    if (promoPercentage >= 1 && promoPercentage <= 99) {
      const reduction = actualPrice * (promoPercentage / 100);
      finalPrice = actualPrice - reduction;
      return finalPrice;
    }
  };

  const onPromoStartChange = (e) => {
    promoStartTimestamp = e.target.valueAsNumber;
    setProduct({
      ...product,
      promoStart: promoStartTimestamp,
    });
  };

  const onPromoEndChange = (e) => {
    promoEndTimestamp = e.target.valueAsNumber;
    setProduct({
      ...product,
      promoEnd: promoEndTimestamp,
    });
  };

  const onPromoInput = (e) => {
    if (e.target.value >= 0 && e.target.value <= 99) {
      setPromoPercentage(e.target.value);
    } else {
      alert("La promo doit être comprise être 1 et 99");
    }
  };

  const onSubmitPromo = async (e) => {
    e.preventDefault();
    calcPromo();
    product.promoPrice = finalPrice;
    if (
      product.promoEnd === 0 &&
      product.promoStart === 0 &&
      product.promoPrice === 0
    ) {
      alert("Champ(s) manquant(s)");
      return;
    }
    await axios.put(
      `https://mercadona-back-f6ca31b18f7a.herokuapp.com/product/${product.id}`,
      product
    );
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://mercadona-back-f6ca31b18f7a.herokuapp.com/product/${id}`,
      product
    );
    navigate("/admin");
  };

  return (
    <div className="container-fluid shadow p-3 mb-5 rounded">
      <button
        className="btn btn-primary mb-2  d-flex align-self-start"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>

      <h1 className="mb-5 text-uppercase">Modifier le produit</h1>
      <div className="mb-5 ">
        <>
          <Button variant="success" onClick={handleShow}>
            Promotions
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Saisir la promotion pour {product.name.toLowerCase()}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="text-uppercase font-weight-bold">
                Pourcentage
              </label>
              <input
                required
                type="text"
                className="form-control mb-3"
                name="percentage"
                placeholder="pourcentage de réduction"
                onChange={(e) => onPromoInput(e)}
              />
              <label className="text-uppercase font-weight-bold">
                Date de début de la promotion
              </label>
              <input
                required
                type="date"
                className="form-control  mb-3"
                id="startDate"
                name="startDate"
                placeholder="Date de début de la promotion"
                onChange={(e) => onPromoStartChange(e)}
              />
              <label className="text-uppercase font-weight-bold">
                Date de fin de la promotion
              </label>
              <input
                required
                type="date"
                className="form-control  mb-3"
                id="endDate"
                name="endDate"
                placeholder="Date de fin de la promotion"
                onChange={(e) => {
                  onPromoEndChange(e);
                }}
              />
              <p>Nouveau prix : {calcPromo()}€</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Annuler
              </Button>
              <Button variant="success" onClick={onSubmitPromo}>
                Valider la promotion
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="custom-file mb-5 d-flex flex-column">
          <label className="custom-file-label text-uppercase font-weight-bold">
            Ajouter une image
          </label>
          <input
            required
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
            required
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
            required
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
            required
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
          <div className="from-control d-flex justify-content-around">
            <button
              className="btn btn-primary mt-2 btn-danger"
              onClick={deleteProduct}
            >
              Supprimer le produit
            </button>
            <button className="btn btn-primary mt-2">
              Modifier le produit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
