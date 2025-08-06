const Blog = require("../Models/blog.model");
const cloudinary = require("cloudinary").v2;


module.exports.createBlogService = async ({ title, content, tags = [], images = [], author }) => {
  if (!title || !content || !author) {
    throw new Error("Title, Content, and Author are required fields");
  }

  let imageUrls = [];
  if (images && images.length > 0) {
    for (const file of images) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "blogs",
      });
      imageUrls.push(result.secure_url);
    }
  }

  const parsedTags = Array.isArray(tags)
    ? tags.map(tag => tag.trim()).filter(tag => tag !== "")
    : [];

  const newBlog = await Blog.create({
    title: title.trim(),
    content: content.trim(),
    tags: parsedTags,
    images: imageUrls,
    author,
  });

  return newBlog;
};


