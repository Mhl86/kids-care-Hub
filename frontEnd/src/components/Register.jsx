import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("parent");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const dataToSend = { ...formData, role };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed!");
        return;
      }

      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register As
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 break-words">{error}</p>
        )}

        {/* Role selection */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="parent"
              checked={role === "parent"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-blue-600"
            />
            Parent
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="caregiver"
              checked={role === "caregiver"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-blue-600"
            />
            Care Giver
          </label>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
