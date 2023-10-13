import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Admin />
    </div>
  );
}

export default App;
