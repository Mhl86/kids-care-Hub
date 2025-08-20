import bgImage from "../assets/1.png";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col ">
      <nav className="relative bg-fuchsia-400 bg-center p-4 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Background image */}
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center md:text-left relative z-10">
          KidsCare Hub
        </h1>
        {/* Buttons */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0 relative z-10">
          <button
            onClick={() => navigate("/register")}
            className="hover:scale-105 transition-transform px-4 py-2 text-white rounded bg-blue-500"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="hover:scale-105 transition-transform px-4 py-2 text-white rounded ml-4 bg-green-500"
          >
            Login
          </button>
        </div>
      </nav>
      <div>
        <img
          src={bgImage}
          alt="Background"
          className=" inset-0 object-cover w-full h-1/5 "
        />
      </div>
      <hr className="border-t-2 border-gray-300 my-4" />
    </div>
  );
};

export default Navbar;
