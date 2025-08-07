// src/Pages/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import BlogCard from "../Components/BlogCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar"; 
import { UserContext } from "../Contexts/UserContext"; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext) || {};

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs/getallblogs");
      console.log("Fetched blogs:", res.data);
      setBlogs(res.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="px-4 py-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl font-bold animate-gradient text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 mb-4">
            Discover & Share Inspiring Blogs ✍️
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            A platform where writers and readers connect through creativity, stories, and ideas.
          </p>
          <button
            onClick={() => toast.info("🛠️ Blog creation is coming soon here! For Now Go to Create Button")}
            className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 transition rounded-full text-white font-semibold shadow-lg"
          >
            ✨ Start Writing
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id || blog.id} blog={blog} currentUserId={user?._id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-10">😕 No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
