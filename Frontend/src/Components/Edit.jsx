import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    API.get(`/blogs/getblog/${blogId}`)
      .then((res) => {
        const blog = res.data.blog;
        setTitle(blog.title);
        setContent(blog.content);
        setTags(blog.tags.join(", "));
        setExistingImages(blog.images || []);
      })
      .catch((err) => {
        toast.error("❌ Failed to load blog");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await API.put(`/blogs/update/${blogId}`, formData);
      toast.success("✅ Blog updated successfully!");
      navigate("/my-blog");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "";
    return imgPath.replace(/\\/g, "/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-3xl mx-auto mt-10 bg-[#1e2738] p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-lime-400">✏️ Edit Your Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="p-3 rounded-lg bg-[#101624] text-white"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            rows={8}
            className="p-3 rounded-lg bg-[#101624] text-white"
            required
          ></textarea>

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="p-3 rounded-lg bg-[#101624] text-white"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 bg-[#101624] text-white"
          />

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`Existing ${i}`}
                  className="w-24 h-24 object-cover rounded border border-gray-400"
                />
              ))}
            </div>
          )}

          {/* New Preview Images */}
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Preview ${i}`}
                  className="w-24 h-24 object-cover rounded border border-lime-400"
                />
              ))}
            </div>
          )}

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
                Updating...
              </>
            ) : (
              "✏️ Update Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
