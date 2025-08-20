import "./index.css";
import Home from "./components/Home-t.jsx";
import { Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
function App() {
  return (
    <Routes>
      {/* Wrap all pages with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Default / route */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default App;
