import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HandleAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState([]);
  const [adminId, setAdminId] = useState(0);
  const [emailError, setEmailError] = useState("");
  const { username, email, password } = newAdmin;
  let navigate = useNavigate();
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    loadAdmins();
  }, [admins]);

  const loadAdmins = async () => {
    const res = await axios.get(
      "https://mercadona-back-f6ca31b18f7a.herokuapp.com/admins"
    );
    setAdmins(res.data);
  };

  const onInputChange = (e) => {
    setAdminId(e.target.value);
  };

  const newAdminEmailChange = (e) => {
    if (!regex.test(e.target.value)) {
      setEmailError("email invalide");
    } else {
      setNewAdmin({ ...newAdmin, email: e.target.value });
      setEmailError("");
    }
  };

  const newAdminInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const deleteAdmin = async (e) => {
    e.preventDefault();
    await axios.delete(
      `https://mercadona-back-f6ca31b18f7a.herokuapp.com//admin/${adminId}`
    );
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    for (let i = 0; i < admins.length; i++) {
      if (newAdmin.email === admins[i].email) {
        alert("cet  email est déjà utilisé");
        return;
      }
    }
    const res = await axios.post(
      "https://mercadona-back-f6ca31b18f7a.herokuapp.com/register",
      newAdmin
    );
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
          {admins.map((ad, index) => (
            <li category={ad} key={index}>
              {ad.username} id: {ad.id}
            </li>
          ))}
        </ul>
        <form>
          <div className="form-group mb-5">
            <label>Username</label>
            <input
              required
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={(e) => newAdminInputChange(e)}
            />
            <label>Email</label>
            <input
              required
              type="email"
              className="form-control"
              name="email"
              placeholder="E-mail"
              onChange={(e) => newAdminEmailChange(e)}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Mot de passe"
              onChange={(e) => newAdminInputChange(e)}
            />
            <button
              onClick={(e) => addAdmin(e)}
              className="btn btn-primary mt-2"
            >
              Ajouter l'administrateur
            </button>
          </div>

          <div className="form-group mb-5">
            <label>Saisir l'id de l'administrateur à supprimer</label>
            <input
              required
              type="text"
              className="form-control"
              name="categoryId"
              placeholder="Id de la catégorie"
              value={adminId}
              onChange={(e) => onInputChange(e)}
            />
            <button
              onClick={deleteAdmin}
              type="submit"
              className="btn btn-danger mt-2"
            >
              Supprimer l'administrateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
