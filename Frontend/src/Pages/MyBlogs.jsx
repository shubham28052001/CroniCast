import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import API from "../utils/axios";
import BlogCard from "../Components/MyBlogCard"; // ✅ Your reusable card
import Navbar from "../Components/Navbar";
const MyBlogs = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
const handleBlogDelete = (deletedId) => {
  setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== deletedId));
};
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get(`/blogs/getmyblog/${user._id}`);
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user) {
      fetchBlogs();
    }
  }, [user, userLoading]);

  return (
<div className="min-h-screen bg-gray-900 text-white">
  <Navbar />
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center mb-10 text-transparent bg-clip-text animate-gradient">
          📚 My Cronicasts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            You haven’t written any blogs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog}onDelete={handleBlogDelete}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
