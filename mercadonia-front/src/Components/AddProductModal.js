import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddProductModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Nom du produit" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description du produit"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Prix</Form.Label>
              <Form.Control type="text" placeholder="Prix du produit" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Catégories</Form.Label>
              <Form.Select aria-label="Catégories">
                <option value="1">cat 1</option>
                <option value="2">cat 2</option>
                <option value="3">cat 3</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" placeholder="Image du produit" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
