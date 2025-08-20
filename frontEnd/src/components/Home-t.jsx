import { k1, k2, k3, k4 } from "../assets";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-10 mt-10">
        Welcome to the Kids Care Hub System
      </h1>
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8 ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">
            Be part of your child's every Growth & Development Step
          </h1>
          <br />

          <h1 className="text-xl ">
            We are here to help you in every step of your child's growth
          </h1>
          <br />
        </div>
        <img
          src={k1}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-64 md:h-80 object-cover mb-4 rounded-lg shadow-lg 
             transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h1 className="text-center text-4xl font-bold mb-10">
        Why Choose Our System?
      </h1>
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <img
          src={k2}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-64 md:h-80 object-cover mb-4 rounded-lg shadow-lg 
             transition-transform duration-300 hover:scale-105"
        />
        <div className=" flex justify-center items-center flex-col">
          <ul className="space-y-4 text-left md:text-left text-xl">
            <li>
              📈 Track Progress in Real-Time – Stay updated on every milestone.
            </li>
            <li>🎉 Celebrate Achievements – Capture big and small wins.</li>
            <li>
              🔒 Secure & Accessible – Your child’s journey, safe and available
              anytime.
            </li>
            <li>
              🤝 Parent-Teacher Connection – Bridge home and school seamlessly.
            </li>
          </ul>
        </div>
      </div>
      <h1 className="text-center text-4xl font-bold mb-10">
        Every Step Matters
      </h1>
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <img
          src={k3}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-64 md:h-80 object-cover mb-4 rounded-lg shadow-lg 
             transition-transform duration-300 hover:scale-105"
        />
        <div className="bg-white py-12 px-6 flex justify-center items-center flex-col rounded-lg my-10">
          <h4 className="text-xl text-center max-w-3xl md:text-left">
            From their first words to their first big achievements, every step
            is worth remembering. Our platform makes it easy for families to
            stay connected, celebrate growth, and build lasting memories
            together.
          </h4>
        </div>
      </div>
      <h1 className="text-center text-4xl font-bold mb-10">
        Join Thousands of Families Supporting Their Child’s Future
      </h1>
      <div className="mb-10 flex flex-col items-center gap-8">
        {" "}
        <img
          src={k4}
          alt="KidsCareHub"
          className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-lg mb-6 transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={() => navigate("/register")}
          className="hover:scale-105 transition-transform px-8 py-4 text-xl font-semibold text-white rounded-lg bg-blue-500 w-full md:w-auto"
        >
          Start Now!
        </button>
      </div>
    </>
  );
};

export default Home;
