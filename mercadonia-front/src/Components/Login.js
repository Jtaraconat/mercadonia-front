import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = admin;

  const onInputChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/login", admin)
      .then((response) => {
        if (response.status === 403) {
          console.log("not");
        }

        const token = response.data.token;
        Cookies.set("token", token, { expires: 1, secure: true });
        if (Cookies.get("token") != undefined) {
          navigate("/admin");
        }
      })
      .catch((error) => {
        alert("identifiants incorrects");
      });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mt-3">Se connecter</h1>
        <form
          className="d-flex flex-column align-items-start"
          onSubmit={(e) => onSubmit(e)}
          style={{ width: "75%" }}
        >
          <label className="text-uppercase font-weight-bold mt-3">email</label>
          <input
            required
            type="text"
            className="form-control mb-3"
            name="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
          <label className="text-uppercase font-weight-bold">Username</label>
          <input
            required
            type="text"
            className="form-control  mb-3"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => onInputChange(e)}
          />
          <label className="text-uppercase font-weight-bold">
            Mot de passe
          </label>
          <input
            required
            type="password"
            className="form-control  mb-3"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => onInputChange(e)}
          />
          <button
            className="btn btn-primary mt-2 align-self-end"
            style={{
              borderColor: "#FF773D",
              backgroundColor: "#FF773D",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
