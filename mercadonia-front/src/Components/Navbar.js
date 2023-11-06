import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg "
        style={{
          backgroundColor: "white",
        }}
      >
        <Link
          className="navbar-brand "
          to="/"
          style={{
            color: "#3A8092",
          }}
        >
          Mercadonia Store
        </Link>
        <div>
          <Link className="btn btn-outline-dark m-2" to="/">
            Catalogue
          </Link>
          <Link className="btn btn-outline-dark m-2" to="/admin">
            Login Admin
          </Link>
        </div>
      </nav>
    </div>
  );
}
