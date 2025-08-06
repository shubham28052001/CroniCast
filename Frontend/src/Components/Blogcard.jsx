import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import API from "../utils/axios"
import { Pagination } from 'swiper/modules';
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const BlogCard = ({ blog}) => {
    const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(blog.likes?.includes(user?._id));
  const [likeCount, setLikeCount] = useState(blog.likes?.length || 0);

useEffect(() => {
  console.log("👤 currentUserId:", user?._id);
}, [user]);

 if (!blog) return null;
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        `/blogs/like/${blog._id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedLikes = response.data.data?.likes || []; // ✅ fixed path
      console.log("✅ Like API response:", response.data);
      setLiked(updatedLikes.includes(user?._id));
      setLikeCount(updatedLikes.length);
      console.log("👍 Liked state:", updatedLikes.includes(user?._id));
      console.log("🔢 Like count:", updatedLikes.length);
    } catch (error) {
      console.error("❌ Failed to toggle like:", error.message);
    }
  };

  return (
    <div className="bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-lime-400/50 transition-all duration-500 ease-in-out cursor-pointer">
      {/* Images Swiper or Single Image */}
      {Array.isArray(blog.images) && blog.images.length > 0 ? (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-xl overflow-hidden border border-pink-400/20 shadow-xl group"
        >
          {blog.images.map((img, index) => (
            <SwiperSlide key={index} >
              <div onDoubleClick={handleLike}>
                <img
                  src={img}
                  alt={`Blog Image ${index + 1}`}
                  className="w-full h-52 md:h-72 object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : blog.image ? (
        <div onDoubleClick={handleLike}>
          <img
            src={blog.image}
            alt="Blog Cover"
            className="w-full h-52 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : null}

      {/* Content */}
      <div className="p-4 relative">
        <p className="text-xs text-lime-400 uppercase tracking-widest mb-1">Featured</p>
        <h2
          className="text-xl md:text-2xl font-bold text-white line-clamp-2"
          style={{ textShadow: '0 0 10px rgba(0,255,255,0.6)' }}
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
        {/* Read More */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/blogs/${blog._id}`}
            className="animate-gradient font-medium hover:underline text-sm md:text-base"
          >
            Read More →
          </Link>

          {/* Likes and Comments Count */}
          <div className="flex">
            <div className="flex items-center gap-2">
            <button onClick={handleLike}>
              {liked ? (
                <FaHeart className="text-red-500 text-lg transition-colors duration-300" />
              ) : (
                <FaRegHeart className="text-white text-lg transition-colors duration-300" />
              )}
            </button>
            <span className="text-xs text-white ">{likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-xl">💬</span>
            <span className="text-xs text-white">
              {blog.comments?.length || 0}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
