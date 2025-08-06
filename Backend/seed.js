// seed.js

require("dotenv").config(); // ✅ Load environment variables from .env

const mongoose = require("mongoose");

// ✅ Correct faker locale setup
const { faker } = require('@faker-js/faker');
faker.locale = "en";

const User = require("./Models/user.model");
const Blog = require("./Models/blog.model");

// ✅ MongoDB connection URI from .env
const MONGO_URI = process.env.MONGO_URI;

// ✅ Cloudinary sample images
const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061451/cld-sample-4.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061451/cld-sample-2.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061443/samples/landscapes/nature-mountains.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061448/samples/balloons.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061442/samples/imagecon-group.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061442/samples/landscapes/beach-boat.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061441/samples/landscapes/architecture-signs.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061442/samples/people/bicycle.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061440/samples/food/pot-mussels.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061440/samples/food/fish-vegetables.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061441/samples/bike.jpg",
  "https://res.cloudinary.com/dotg812mg/image/upload/v1754061442/samples/ecommerce/accessories-bag.jpg"
];


// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Generate dummy blog content
const generateContent = () => {
  return faker.lorem.paragraphs({ min: 4, max: 8 });
};

// ✅ Generate random tags
const generateTags = () => {
  return faker.helpers.shuffle([
    "technology", "life", "coding", "travel", "indian City",
    "career", "God", "Adventures", "Mountains", "react"
  ]).slice(0, Math.floor(Math.random() * 4) + 1);
};

// ✅ Generate random comments
const generateComments = (users) => {
  const numComments = Math.floor(Math.random() * 50);
  return Array.from({ length: numComments }).map(() => ({
    user: faker.helpers.arrayElement(users)._id,
    comment: faker.lorem.sentence(),
    createdAt: faker.date.past(),
  }));
};

// ✅ Generate random likes
const generateLikes = (users) => {
  const numLikes = Math.floor(Math.random() * 100);
  const shuffled = faker.helpers.shuffle(users);
  return shuffled.slice(0, numLikes).map(user => user._id);
};

// ✅ Seeding function
const seedDB = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    console.log("🗑️ Old users and blogs deleted");

    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push(new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
      }));
    }

    const createdUsers = await User.insertMany(users);
    console.log("✅ 100 Users created");

    const blogs = [];
    for (let i = 0; i < 100; i++) {
      const author = faker.helpers.arrayElement(createdUsers);
      blogs.push(new Blog({
        title: faker.lorem.sentence(5),
        content: generateContent(),
        images: faker.helpers.shuffle(CLOUDINARY_IMAGES).slice(0, 2),
        author: author._id,
        tags: generateTags(),
        likes: generateLikes(createdUsers),
        comments: generateComments(createdUsers),
      }));
    }

    await Blog.insertMany(blogs);
    console.log("✅ 100 Blogs created");

  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    mongoose.disconnect();
    console.log("🌱 Seeding complete. MongoDB disconnected");
  }
};

// ✅ Run it
seedDB();
