import { Route, Routes } from "react-router";
import Navbar from "./components/navbar.jsx";
import "./index.css";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="parents" element={<Parents />} />
      </Route>
    </Routes>
  );
}
export default App;
