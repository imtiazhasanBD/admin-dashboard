import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import ProductUpload from "./pages/ProductUpload";
import DashBoard from "./components/DashBoard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protect these routes */}
        <Route path="/" element={<PrivateRoute><Layout><DashBoard /></Layout></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} />
        <Route path="/productupload" element={<PrivateRoute><Layout><ProductUpload /></Layout></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
