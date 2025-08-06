import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { UserContext } from "../Contexts/UserContext";
import API from "../utils/axios";
import { toast } from "react-toastify";

const MyBlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!blog) return null;

  const handleDelete = async () => {

    try {
      await API.delete(`/blogs/delete/${blog._id}`, { withCredentials: true });
      toast.success("Blog deleted successfully!");
      if (onDelete) onDelete(blog._id);
    } catch (err) {
      toast.error("Failed to delete blog");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-lime-400/50 transition-all duration-500 ease-in-out cursor-pointer">
      {/* Images Swiper or Single Image */}
      {Array.isArray(blog.images) && blog.images.length > 0 ? (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {blog.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Blog Image ${index + 1}`}
                className="w-full h-52 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : blog.image ? (
        <img
          src={blog.image}
          alt="Blog Cover"
          className="w-full h-52 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
        />
      ) : null}

      {/* Content */}
      <div className="p-4 relative">
        <p className="text-xs text-lime-400 uppercase tracking-widest mb-1">Featured</p>
        <h2
          className="text-xl md:text-2xl font-bold text-white line-clamp-2"
          style={{ textShadow: "0 0 10px rgba(0,255,255,0.6)" }}
        >
          {blog.title}
        </h2>

        {/* Tags */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-gray-700 text-teal-300 font-medium tracking-wide"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Date */}
        <div className="pt-6 border-t border-gray-700 flex justify-between flex-wrap gap-3 text-sm text-gray-400">
          <span>
            👤 <span className="text-teal-400 font-medium">
              {blog.author?.name || "Anonymous"}
            </span>
          </span>
          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
        </div>

        {/* Read More + Likes/Comments */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-white flex gap-4">
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/blogs/${blog._id}`}
            className="animate-gradient font-medium hover:underline text-sm md:text-base"
          >
            Read More →
          </Link>
          {/* 🛠️ Edit & Delete buttons (only if author) */}
          <div className="flex gap-2">
            <Link to={`/edit-blog/${blog._id}`}
              className="text-blue-400 hover:underline">
              Edit
            </Link>
            <Link
              onClick={handleDelete}
              className="text-red-400 hover:underline"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
