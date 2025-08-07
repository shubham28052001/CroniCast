import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import API from "../utils/axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(
        `/users/contact`,
        { name, email, message },
      );
      if (res.data.success) {
        console.log("✅ Message sent successfully!");
        toast.success("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.log(`❌ ${res.data.message || "Failed to send message"}`);
        toast.error(`❌ ${res.data.message || "Failed to send message"}`);
      }
    } catch (error) {
      toast.error(`❌ Failed to send message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 text-white">
      <Navbar />
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8 py-10 mx-auto mt-6 backdrop-blur-sm bg-gray-800 rounded-3xl shadow-lg border animate-fade-in">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text animate-gradient">
          📬 Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 text-sm sm:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-teal-500 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-600"
            } transition-all duration-300 text-white py-3 px-4 rounded-xl font-semibold tracking-wide`}
          >
            { loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Sending...
              </>
            ) : (
              "🚀 Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
