import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { toast } from "react-toastify";
import API from "../utils/axios";
import Start from "../Components/StartNav"; // optional top nav

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post(`/users/register`,
        { name, email, password },
        { withCredentials: true }
      );
        setUser(response.data.data);
         toast.success("Signup successful!");
        navigate("/home");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Start /> {/* Optional top nav */}

      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black to-gray-700 px-4 py-6 sm:py-10">
        <div className="bg-white/5 backdrop-blur-md border border-green-400 p-8 rounded-xl w-full max-w-md shadow-[0_0_25px_#00ff99] transition-all duration-500">

          <h2 className="text-3xl font-bold text-white text-center font-playwrite">
            Create Your Chronicle on <span className="text-green-400">ChroniCast📝</span>
          </h2>
          <p className="text-sm text-gray-400 text-center mb-2 italic">
            Every idea begins with a single word.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-white text-sm font-medium">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 rounded-md bg-black border border-green-500 text-green-400 placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your name"
              />
            </label>

            <label className="block mb-4">
              <span className="text-white text-sm font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 rounded-md bg-black border border-green-500 text-green-400 placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
              />
            </label>

            <label className="block mb-6">
              <span className="text-white text-sm font-medium">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-2 rounded-md bg-black border border-green-500 text-green-400 placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="******"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 text-black py-2 rounded-md font-semibold tracking-wide transition-all duration-300 shadow hover:shadow-[0_0_15px_#00ff99] font-playwrite disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing Up...
                </>
              ) : (
                "Signup to ChroniCast"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-400"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
