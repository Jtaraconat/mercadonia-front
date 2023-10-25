import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import SearchEditProduct from "./Components/SearchEditProduct";

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
            path="/admin/editproduct"
            element={<SearchEditProduct />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
