import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const token = Cookies.get("token");

  useEffect(() => {
    let auth = { token: token };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  }, [token]);
}
