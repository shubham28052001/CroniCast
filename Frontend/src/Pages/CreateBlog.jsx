import React, { useState } from "react";
import API from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and Content are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    tags.forEach((tag) => formData.append("tags[]", tag));
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await API.post(`/blogs/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Blog created successfully!");
      setTitle("");
      setContent("");
      setTags([]);
      setImages([]);
      setImagePreviews([]);
      setTagInput("");
      navigate("/home");
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error(
        err?.response?.data?.message || "Failed to create blog. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 min-h-screen text-gray-300">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 px-4 py-20 text-white">
        <div className="max-w-2xl mx-auto bg-[#1f1f2e] border border-gray-700 p-8 rounded-3xl shadow-lg shadow-teal-500/10 backdrop-blur-lg">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-transparent animate-gradient">
            📝 Publish a New Blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="6"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
                placeholder="Write your blog content here..."
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-teal-600 file:text-white
                  hover:file:bg-teal-700 cursor-pointer"
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {imagePreviews.map((preview, idx) => (
                  <img
                    key={idx}
                    src={preview}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-600 shadow-md"
                  />
                ))}
              </div>
            )}

            {/* Tag input and chips */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Type tag and click Add"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-red-400 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-teal-500 ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-600"
              } transition-all duration-300 text-white py-3 px-4 rounded-xl font-semibold tracking-wide`}
            >
              {loading ? (
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
                  Publishing...
                </>
              ) : (
                "📝 Publish Blog"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
