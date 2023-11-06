import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function SearchProduct() {
  let navigate = useNavigate();
  let finalPrice = 0;
  let promoStartTimestamp;
  let promoEndTimestamp;
  const [categories, setCategories] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [promoPercentage, setPromoPercentage] = useState(0);
  const [foundProduct, setFoundProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productVisibility, setProductVisibility] = useState(false);
  const { id } = useParams();

  useEffect(() => {
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

  const onPromoInput = (e) => {
    setPromoPercentage(e.target.value);
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

  const calcPromo = () => {
    const actualPrice = foundProduct.price;
    if (promoPercentage >= 1 && promoPercentage <= 99) {
      const reduction = actualPrice * (promoPercentage / 100);
      finalPrice = actualPrice - reduction;
      return finalPrice;
    }
  };

  const onPromoStartChange = (e) => {
    promoStartTimestamp = e.target.valueAsNumber;
    setFoundProduct({
      ...foundProduct,
      promoStart: promoStartTimestamp,
    });
  };

  const onPromoEndChange = (e) => {
    promoEndTimestamp = e.target.valueAsNumber;
    setFoundProduct({
      ...foundProduct,
      promoEnd: promoEndTimestamp,
    });
  };

  const onSubmitPromo = async (e) => {
    e.preventDefault();
    calcPromo();
    foundProduct.promoPrice = finalPrice;
    console.log(foundProduct);

    await axios.put(
      `http://localhost:8080/product/${foundProduct.id}`,
      foundProduct
    );

    console.log(foundProduct);

    navigate("/admin");
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
        <div>
          <div className="form-group mb-3 d-flex">
            <Card product={foundProduct} />
          </div>
          <div className="form-group mb-3">
            <div className="from-control d-flex justify-content-evenly">
              <Link
                type="submit"
                className="btn btn-primary mt-2"
                to={`${foundProduct.id}`}
              >
                Modifier le produit
              </Link>
              <>
                <Button variant="success" onClick={handleShow}>
                  Promotions
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Saisir la promotion pour {foundProduct.name}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <label className="text-uppercase font-weight-bold">
                      Pourcentage
                    </label>
                    <input
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
                      type="date"
                      className="form-control  mb-3"
                      id="endDate"
                      name="endDate"
                      placeholder="Date de fin de la promotion"
                      onChange={(e) => {
                        onPromoEndChange(e);
                      }}
                    />
                    <p>Nouveau prix : {calcPromo()} €</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button variant="success" onClick={onSubmitPromo}>
                      Valider la promotion
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
