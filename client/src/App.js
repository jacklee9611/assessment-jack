import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Products/Products";
import EditProduct from "./pages/EditProduct/EditProduct";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Toast message when an action is complete (set toast container) */}
        <ToastContainer
          position="top-center"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/editproduct/:id" exact Component={EditProduct} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
