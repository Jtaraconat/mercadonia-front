import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const instance = axios.create();
instance.defaults.timeout = 250000;

export default function Login() {
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let navigate = useNavigate();
  const DB_URI = "https://mercadona-backend-a4636f3a3a49.herokuapp.com";
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const { username, email, password } = admin;

  const onInputChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const adminEmailChange = (e) => {
    setAdmin({ ...admin, email: e.target.value });
    if (regex.test(e.target.value)) {
      setAdmin({ ...admin, email: e.target.value });
      setEmailError("");
    } else {
      setEmailError("email invalide");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await instance
      .post(`${DB_URI}/login`, admin)
      .then((response) => {
        if (response.status === 403) {
          alert("");
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
            onChange={(e) => adminEmailChange(e)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
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
