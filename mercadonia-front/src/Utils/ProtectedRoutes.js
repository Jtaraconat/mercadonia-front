import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes() {
  const token = Cookies.get("token");
  let auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
