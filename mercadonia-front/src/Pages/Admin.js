import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../Components/AddProductModal";

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
      <div>
        <Navbar />
        <h1>{"Bienvenue " + admin.username}</h1>
      </div>
      <div className="admin-menu d-flex justify-content-around">
        <AddProductModal />
      </div>
    </div>
  );
}
