import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HandleCategories() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [newCategory, setNewCategory] = useState({
    tag: "",
  });

  useEffect(() => {
    loadCategories();
  }, [categories]);

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
    }
  };

  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const onInputChange = (e) => {
    setCategoryId(e.target.value);
  };

  const deleteCategory = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8080/category/${categoryId}`)
      .catch((error) => {
        alert("id introuvable");
      });
  };

  return (
    <div className="container-fluid">
      <div className="mb-5">
        <button
          className="btn btn-danger mb-2 d-flex align-self-start"
          onClick={() => navigate(-1)}
        >
          Retour
        </button>
      </div>
      <div className="d-flex flex-row">
        <ul>
          {categories.map((cat, index) => (
            <li category={cat} key={index}>
              {cat.tag} id: {cat.id}
            </li>
          ))}
        </ul>
        <form>
          <div className="form-group mb-5">
            <label>Saisir le nom de la catégorie à ajouter</label>
            <input
              required
              type="text"
              className="form-control"
              name="categoryId"
              placeholder="Nom de la catégorie"
              value={newCategory.tag}
              onChange={(e) => onNewCategoryInputChange(e)}
            />
            <button onClick={addCategory} className="btn btn-primary mt-2">
              Ajouter la catégorie
            </button>
          </div>

          <div className="form-group mb-5">
            <label>Saisir l'id de la catégorie à supprimer</label>
            <input
              type="text"
              className="form-control"
              name="categoryId"
              placeholder="Id de la catégorie"
              value={categoryId}
              onChange={(e) => onInputChange(e)}
            />
            <button
              onClick={deleteCategory}
              type="submit"
              className="btn btn-danger mt-2"
            >
              Supprimer la catégorie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
