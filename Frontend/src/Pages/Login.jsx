import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-toastify";
import StartNav from "../Components/StartNav"; // Optional: use if needed

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("users/login", { email, password }, {
        withCredentials: true,
      });

      setUser(res.data.data);
      toast.success("Login successful ✅");
      navigate("/home");
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <StartNav />

      <div className="mmin-h-screen flex flex-col items-center bg-gradient-to-br from-black to-gray-700 px-4 py-6 sm:py-10">
        <div className="bg-white/5 backdrop-blur-md border border-green-400 p-8 rounded-xl w-full max-w-md shadow-[0_0_25px_#00ff99] transition-all duration-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="Avatar"
            className="w-16 h-16 mx-auto mb-1 rounded-full shadow-md"
          />

          <h2 className="text-3xl font-bold text-white text-center mb-2 font-playwrite">
            Welcome Back to <span className="text-green-400 font-playwrite">ChroniCast📝</span>
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6 italic">
            Share your stories. Inspire the world.
          </p>

          <form onSubmit={handleLogin}>
            <label className="block mb-1">
              <span className="text-white text-sm font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 rounded-md bg-black border border-green-500 text-green-400 placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 italic"
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
              <Link to="/forgot-password" className="text-sm text-blue-600 underline">
                Forgot your password?
              </Link>
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
                  Logging in...
                </>
              ) : (
                "Login to ChroniCast"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-300 mt-6">
            New here?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-600 hover:text-green-400"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
