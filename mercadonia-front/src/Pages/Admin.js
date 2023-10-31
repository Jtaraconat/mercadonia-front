import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    loadAdminName();
  }, []);

  const loadAdminName = async () => {
    const res = await axios.get("http://localhost:8080/admins");
    setAdmin(res.data);
  };

  return (
    <div className="container-fluid">
      <p>hello</p>
      <Link className="btn btn-outline-dark m-2" to="/admin/addproduct">
        Ajouter un produit
      </Link>
      <Link className="btn btn-outline-dark m-2" to="/admin/searchproduct">
        Rechercher et modifier un produit
      </Link>
    </div>
  );
}
