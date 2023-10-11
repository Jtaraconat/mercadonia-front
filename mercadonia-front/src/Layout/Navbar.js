import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Mercadonia
        </a>
        <button className="btn btn-outline-dark">Catalogue</button>
        <button className="btn btn-outline-dark">Login Admin</button>
      </nav>
    </div>
  );
}
