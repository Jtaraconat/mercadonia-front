import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import SearchProduct from "./Components/SearchProduct";
import EditProduct from "./Components/EditProduct";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/addproduct" element={<AddProduct />} />
          <Route
            exact
            path="/admin/searchproduct"
            element={<SearchProduct />}
          />
          <Route
            exact
            path="/admin/searchproduct/:id"
            element={<EditProduct />}
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
