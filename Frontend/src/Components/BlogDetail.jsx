import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { UserContext } from "../Contexts/UserContext";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { user } = useContext(UserContext);
  const currentUserId = user?._id; // ✅ yahi correct use hai

  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/getblog/${blogId}`);
        setBlog(res.data.blog);
        setComments(res.data.blog.comments || []);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      const res = await API.post(`/blogs/comment/${blog._id}`, {
        comment: commentText,
      });
      setComments(res.data.data);
      setCommentText("");
      toast.success("Comment added!");
    } catch (err) {
      console.error("❌ Error adding comment:", err);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await API.delete(`/blogs/commentdelete/${blog._id}/${commentId}`);
      setComments(res.data.data);
      toast.success("Comment deleted");
    } catch (err) {
      console.error("❌ Error deleting comment:", err);
      toast.error("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e1a] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0e0e1a] flex justify-center items-center text-white text-xl">
        Blog not found!
      </div>
    );
  }

  const images = blog.images || [];

  return (
    <div className="min-h-screen bg-[#0e0e1a] px-4 py-10 text-white">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1f1f2e] to-[#14141f] border border-[#c2c3b] hover:shadow-lime-400 rounded-2xl shadow-lg shadow-pink-500/10 p-8">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 0 12px rgba(0, 255, 255, 0.5)' }}>
          {blog.title}
        </h1>
        <p className="text-gray-400 italic text-lg mb-6">✨ A story worth sharing</p>

        {/* Swiper */}
        {images.length > 0 && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="rounded-xl border border-pink-400/20 shadow-xl hover:shadow-teal-400 transition duration-300"
          >
            {images.map((img, i) => {
              const imageUrl = img.includes("res.cloudinary.com")
                ? img
                : `${import.meta.env.VITE_BACKEND_URL}/${img.startsWith("/") ? img.slice(1) : img}`;

              return (
                <SwiperSlide key={i}>
                  <img
                    src={imageUrl}
                    alt={`Blog image ${i + 1}`}
                    className="w-full aspect-[16/9] sm:h-[450px] object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none mt-6 text-gray-300 leading-relaxed tracking-wide space-y-5">
          {blog.content?.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Comments Section */}
        <div className="bg-gray-800 mt-6 p-4 rounded-xl border border-gray-600 space-y-4">
          <h3 className="text-white font-semibold text-lg">💬 Comments</h3>

          {/* Comment Input */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 min-w-0 px-3 py-2 sm:p-4 rounded-md bg-gray-700 text-white border border-gray-500 focus:outline-none"
            />
            <button
              onClick={handleAddComment}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>


          {/* Comment List */}
          {comments.length === 0 ? (
            <p className="text-sm text-gray-400">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {[...comments]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment) => {
                  return (
                    <div
                      key={comment._id}
                      className="bg-gray-700 p-3 rounded-md flex justify-between items-start"
                    >
                      <div>
                        <p className="text-teal-400 font-medium text-sm">
                          👤 {comment.user?.name || "Anonymous"}
                        </p>
                        <p className="text-white">{comment.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {comment.user && currentUserId?.toString() === comment.user._id?.toString() && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-400 hover:underline text-xs ml-4"
                          title="Delete your comment"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-700 grid gap-3 md:flex md:justify-between text-sm text-gray-400">
          <span>👤 <span className="text-teal-400 font-medium">{blog.author?.name || "Anonymous"}</span></span>
          <span>📅 {new Date(blog.createdAt).toLocaleDateString(undefined, {
            year: "numeric", month: "long", day: "numeric"
          })}</span>
        </div>

        <Link
          to="/home"
          className="mt-10 inline-block text-sm animate-gradient transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
