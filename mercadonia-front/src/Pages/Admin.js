import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState([false]);

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  const checkLogin = () => {
    if (Cookies.get("token") === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const logOut = () => {
    Cookies.remove("token");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="container-fluid" style={{ minHeight: "600px" }}>
          <div className="d-flex mt-5 flex-row justify-content-center shadow">
            <Link className="btn btn-outline-dark m-3" to="/admin/addproduct">
              Ajouter un produit
            </Link>
            <Link
              className="btn btn-outline-dark m-3"
              to="/admin/searchproduct"
            >
              Rechercher et modifier un produit
            </Link>
            <Link
              className="btn btn-outline-dark m-3"
              to="/admin/handlecategories"
            >
              Gérer les catégories
            </Link>
            <Link className="btn btn-outline-dark m-3" to="/admin/newadmin">
              Gérer les administrateurs
            </Link>
            <Link className="btn btn-danger m-3" to="/" onClick={logOut}>
              Se déconnecter
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
