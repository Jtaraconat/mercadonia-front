import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand " href="#">
          Mercadonia
        </a>
        <div>
          <button className="btn btn-outline-dark m-2">Catalogue</button>
          <button className="btn btn-outline-dark m-2">Login Admin</button>
        </div>
      </nav>
    </div>
  );
}
