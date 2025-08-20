import "./index.css";
import Home from "./components/Home-t.jsx";
import { Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Parents from "./components/parents.jsx";
import CareGiver from "./components/careGiver.jsx";
function App() {
  return (
    <Routes>
      {/* Wrap all pages with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Default / route */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="parents" element={<Parents />} />
        <Route path="caregiver" element={<CareGiver />} />
      </Route>
    </Routes>
  );
}
export default App;
