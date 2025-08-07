const dotenv=require("dotenv")
dotenv.config()
const express = require("express")
const cookieParser = require('cookie-parser')
const cors=require("cors")
const app = express()
const ConnectToDB = require("./Config/Database");
ConnectToDB();
const userRoutes=require("./Routes/user.routes")
const blogRoutes=require("./Routes/blog.routes")
app.use(express.json())
app.use(cors({
  origin: "https://croni-cast.vercel.app",
  credentials: true
}));
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Hello, World!")
})

app.use("/users",userRoutes)
app.use("/blogs",blogRoutes)

module.exports = app;