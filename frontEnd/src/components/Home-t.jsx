import { k1, k2, k3, k4 } from "../assets";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      {/* Hero Section */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 mt-10 leading-snug">
        Welcome to the Kids Care Hub System
      </h1>

      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col justify-center items-center text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Be part of your child's every Growth & Development Step
          </h2>
          <p className="mt-4 text-base sm:text-lg">
            We are here to help you in every step of your child's growth
          </p>
        </div>

        <img
          src={k1}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-52 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Why Choose Section */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
        Why Choose Our System?
      </h2>

      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <img
          src={k2}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-52 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <ul className="space-y-3 text-base sm:text-lg md:text-xl text-left list-disc list-inside">
          <li>
            📈 Track Progress in Real-Time – Stay updated on every milestone.
          </li>
          <li>🎉 Celebrate Achievements – Capture big and small wins.</li>
          <li>🔒 Secure & Accessible – Your child’s journey, safe anytime.</li>
          <li>
            🤝 Parent-Teacher Connection – Bridge home and school seamlessly.
          </li>
        </ul>
      </div>

      {/* Every Step Matters Section */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
        Every Step Matters
      </h2>

      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <img
          src={k3}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-52 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="bg-white py-6 px-4 sm:px-6 md:px-8 flex justify-center items-center flex-col rounded-lg shadow">
          <p className="text-base sm:text-lg md:text-xl text-center md:text-left leading-relaxed">
            From their first words to their first big achievements, every step
            is worth remembering. Our platform makes it easy for families to
            stay connected, celebrate growth, and build lasting memories
            together.
          </p>
        </div>
      </div>

      {/* Join Families Section */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
        Join Thousands of Families Supporting Their Child’s Future
      </h2>

      <div className="mb-12 flex flex-col items-center gap-6">
        <img
          src={k4}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-52 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={() => navigate("/register")}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white rounded-lg bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-transform"
        >
          Start Now!
        </button>
      </div>
    </div>
  );
};

export default Home;
