import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand " to="/">
          Mercadonia
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
