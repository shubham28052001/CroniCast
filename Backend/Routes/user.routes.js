const express=require("express")
const router=express.Router();
const {registerValidation,loginValidation}=require("../validations/user.validation")
const {registerController,loginController,ProfileController,logoutController,ContactControllers,ForgotPasswordControllers,ResetPassControllers}=require("../Controllers/user.controllers")
const {Auth}=require("../Middlewares/auth.middlwares");
router.post("/register",registerValidation,registerController)
router.post("/login",loginValidation,loginController)
router.get("/profile",Auth,ProfileController)
router.get("/logout",Auth,logoutController)
router.post("/contact",ContactControllers)
router.post("/forgot-password",ForgotPasswordControllers)
router.post("/reset-password/:token",ResetPassControllers)
module.exports=router;