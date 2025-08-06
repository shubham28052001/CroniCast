const express=require("express")
const router=express.Router();
const {CreateBlogValidation}= require("../validations/blog.validation")
const {Auth}= require("../Middlewares/auth.middlwares")
const parser=require("../Middlewares/ClousinaryUploads")
const {CreateBlogController,GetallControllers,GetblogbyIdControllers,UpdateControllers,DeleteblogControllers,BloglikeControllers,CommentControllers,DeleteCommentControllers,MyBlogsControllers}= require("../Controllers/blog.controllers")
router.post("/create",parser.array("images", 5),Auth,CreateBlogValidation,CreateBlogController);
router.get("/getallblogs",GetallControllers);
router.get("/getmyblog/:id",Auth,MyBlogsControllers);
router.get("/getblog/:id", GetblogbyIdControllers);
router.put("/update/:id",parser.array("images", 5),Auth,UpdateControllers);
router.delete("/delete/:id",Auth,DeleteblogControllers);
router.post("/like/:id",Auth,BloglikeControllers);
router.post("/comment/:id",Auth,CommentControllers)
router.delete("/commentdelete/:blogId/:commentId", Auth, DeleteCommentControllers);
module.exports=router;



