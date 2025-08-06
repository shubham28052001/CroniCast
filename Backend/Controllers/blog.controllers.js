const cloudinary = require("cloudinary").v2;
const { ERRORRESPONSE, SUCCESSRESPONSE } = require("../utils/resposnse.utils");
const { createBlogService } = require("../Services/blog.services");
const { validationResult } = require("express-validator");
const Blog = require("../Models/blog.model")

module.exports.CreateBlogController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("🟨 [VALIDATION] Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (typeof req.body.tags === 'string') {
            req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
        }
        const { title, content, tags } = req.body;
        const author = req.user._id;
        const images = req.files;

        const newBlog = await createBlogService({
            title,
            content,
            tags,
            images,
            author,
        });
        console.log("Blog created successfully");
        SUCCESSRESPONSE(res, "Blog created successfully", newBlog)
    } catch (err) {
        console.error("❌ Error in createBlogController:", err.message);
        ERRORRESPONSE(res, "Internal Server Error", 500)

    }
};

module.exports.GetallControllers = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "name")
        SUCCESSRESPONSE(res, "Blogs fetched successfully", blogs)
    } catch (error) {
        console.error("Fetch blogs error:", error);
        ERRORRESPONSE(res, "Internal Server Error", 500)
    }
};

module.exports.GetblogbyIdControllers = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log("params:", req.params);
    console.log("Requested Blog ID:", blogId);  // ✅ check if undefined

    const blog = await Blog.findById(blogId).populate("author", "name").populate("comments.user", "name");;

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
  blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.UpdateControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return ERRORRESPONSE(res, "Blog not found", 404);
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return ERRORRESPONSE(res, "Unauthorized: Not your blog", 403);
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    if (tags) {
      if (typeof tags === "string") {
        blog.tags = tags.split(",").map(tag => tag.trim()); 
      } else if (Array.isArray(tags)) {
        blog.tags = tags;
      }
    }

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      blog.images = imageUrls;
    }

    await blog.save();

    SUCCESSRESPONSE(res, "Blog updated successfully", blog);
  } catch (error) {
    console.error("Update blog error:", error);
    ERRORRESPONSE(res, "Internal Server Error", 500);
  }
};

module.exports.DeleteblogControllers = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return ERRORRESPONSE(res, "Blog not found", 404);
    }

    // Check if current user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return ERRORRESPONSE(res, "Unauthorized: Not your blog", 403);
    }
        // 🧹 Delete images from Cloudinary
     for (const url of blog.images) {
      const publicId = url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete blog
    await Blog.findByIdAndDelete(id);
    console.log("Blog deleted successfully");
    SUCCESSRESPONSE(res, "Blog deleted successfully", null);
  } catch (error) {
    console.error("Delete blog error:", error);
    ERRORRESPONSE(res, "Internal Server Error", 500);
  }
};

module.exports.BloglikeControllers=async(req,res)=>{
     try {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) return ERRORRESPONSE(res, "Blog not found", 404);

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId); // dislike
    } else {
      blog.likes.push(userId); // like
    }

   const updatedBlog= await blog.save();
    SUCCESSRESPONSE(res, alreadyLiked ? "Disliked" : "Liked", updatedBlog);
  } catch (error) {
    console.error("Like toggle error:", error);
    ERRORRESPONSE(res, "Internal Server Error", 500);
  }
}

module.exports.CommentControllers=async(req,res)=>{
      try {
    const { id } = req.params; // blog id
    const { comment } = req.body;
    const userId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) return ERRORRESPONSE(res, "Blog not found", 404);

    blog.comments.push({ user: userId, comment });
    await blog.save();
  const updatedBlog = await Blog.findById(id).populate("comments.user", "name email");
    SUCCESSRESPONSE(res, "Comment added", updatedBlog.comments);
  } catch (error) {
    console.error("Add comment error:", error);
    ERRORRESPONSE(res, "Internal Server Error", 500);
  }
};

module.exports.DeleteCommentControllers = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) return ERRORRESPONSE(res, "Blog not found", 404);

    const comment = blog.comments.id(commentId);
    if (!comment) return ERRORRESPONSE(res, "Comment not found", 404);

    if (comment.user.toString() !== userId.toString()) {
      return ERRORRESPONSE(res, "Unauthorized to delete this comment", 403);
    }

    blog.comments.pull(commentId);
    await blog.save();
 const updatedBlog = await Blog.findById(blogId).populate("comments.user");

    SUCCESSRESPONSE(res, "Comment deleted", updatedBlog.comments);
  } catch (error) {
    console.error("Delete comment error:", error);
    ERRORRESPONSE(res, "Internal Server Error", 500);
  }
};

module.exports.MyBlogsControllers = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 }).populate("author","name");

    return SUCCESSRESPONSE(res, "User blogs fetched successfully", blogs);
  } catch (error) {
    console.error("❌ [MYBLOGS] Error:", error.message);
    return ERRORRESPONSE(res, "Failed to fetch user blogs", 500);
  }
};

