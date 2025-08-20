const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register As
        </h2>

        {/* Radio Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              id="value-1"
              name="value-radio"
              value="parent"
              defaultChecked
              className="accent-blue-600"
            />
            <span className="text-gray-700">Parent</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              id="value-2"
              name="value-radio"
              value="caregiver"
              className="accent-blue-600"
            />
            <span className="text-gray-700">Care Giver</span>
          </label>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:scale-105 transition-transform px-4 "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
