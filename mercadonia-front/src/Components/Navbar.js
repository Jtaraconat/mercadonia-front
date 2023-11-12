import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState([]);

  const checkLogin = () => {
    if (Cookies.get("token") === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogin();
  });

  return (
    <div className="mb-2">
      {isLoggedIn ? (
        <nav className="navbar navbar-expand-xxxl" style={{}}>
          <Link
            className="navbar-brand fs-2"
            to="/"
            style={{
              color: "#FF773D",
            }}
          >
            Mercadona Store
          </Link>
          <div>
            <Link className="btn btn-outline-dark m-2" to="/">
              Catalogue
            </Link>

            <Link className="btn btn-outline-dark m-2" to="/admin">
              Espace Admin
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-xxxl" style={{}}>
          <Link
            className="navbar-brand fs-2"
            to="/"
            style={{
              color: "#FF773D",
            }}
          >
            Mercadona Store
          </Link>
          <div>
            <Link className="btn btn-outline-dark m-2" to="/">
              Catalogue
            </Link>

            <Link className="btn btn-outline-dark m-2" to="/login">
              Espace Admin
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
