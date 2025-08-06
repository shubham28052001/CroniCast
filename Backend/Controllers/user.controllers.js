const { validationResult } = require("express-validator");
const { registerUser, loginUser, sendContactMailService, ForgotLink,resetPassword } = require("../Services/user.services");
const { HASHEDPASSWORD, COMPAREPASSWORD } = require("../utils/hash.utils");
const { GENERATETOKEN } = require("../utils/jwt.utils");
const { SUCCESSRESPONSE, ERRORRESPONSE } = require("../utils/resposnse.utils");
const Blacklist = require("../Models/blacklist.model")


module.exports.registerController = async (req, res) => {
  console.log("🟥 [BACKEND] Received:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("🟨 [VALIDATION] Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await HASHEDPASSWORD(password);
    console.log("📦 [UTILS] Hashed password:", hashedPassword);

    const user = await registerUser({ name, email, password: hashedPassword });

    const token = GENERATETOKEN(user.toObject());

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/"
    });

    SUCCESSRESPONSE(res, "User is Registered Successfully", { user, token });
  } catch (error) {
    console.error("❌ [REGISTER] Error:", error.message);

    if (error.message.includes("Email already Exist")) {
      return ERRORRESPONSE(res, error.message, 409); // 409 Conflict
    }

    ERRORRESPONSE(res, "Internal server error", 500);
  }
};

module.exports.loginController = async (req, res) => {
  console.log("🟥 [BACKEND] Received:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("🟨 [VALIDATION] Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await loginUser({ email, password });

    if (!user) {
      return ERRORRESPONSE(res, "Email does not Exist", 404);
    }
    const isMatched = await COMPAREPASSWORD(password, user.password);
    if (!isMatched) {
      return ERRORRESPONSE(res, "Invalid email or password", 401);
    }

    const token = GENERATETOKEN(user.toObject());
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/"
    });
    return SUCCESSRESPONSE(res, "Login Successfully", {
      user,
      token,
    });
  } catch (error) {
    console.error("❌ [Login] Error:", error.message);

    if (error.message.includes("Email does not Exist")) {
      return ERRORRESPONSE(res, error.message, 409);
    }

    return ERRORRESPONSE(res, "Internal server error", 500);
  }
};

module.exports.ProfileController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return ERRORRESPONSE(res, "User not found", 404);
    }

    return SUCCESSRESPONSE(res, "Profile fetched successfully", user);
  } catch (error) {
    console.error("❌ [PROFILE] Error:", error.message);
    return ERRORRESPONSE(res, "Failed to fetch profile", 500);
  }
};

module.exports.logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return ERRORRESPONSE(res, "No token provided", 400);
    }
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await Blacklist.create({
      token,
      expiredAt: expiryDate,
    });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    });
    console.log("Logout successful");

    return SUCCESSRESPONSE(res, "Logout successful");
  } catch (error) {
    console.error("❌ [LOGOUT] Error:", error.message);
    return ERRORRESPONSE(res, "Internal server error", 500);
  }
};

module.exports.ContactControllers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    console.log("📨 Sending email with:", { name, email, message });
    await sendContactMailService({ name, email, message });
    SUCCESSRESPONSE(res, "Message Sent Successfully", 200)

  } catch (error) {
    console.error("Email sending failed:", error);
    ERRORRESPONSE(res, "Something went wrong", 500)
  }
}

module.exports.ForgotPasswordControllers = async (req, res) => {
  try {
    if (!req.body || !req.body.email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const email = req.body.email;
    console.log("🔐 Forgot Password Request for:", email);

    const msg = await ForgotLink({ email }); // Function to send email with reset token

    return SUCCESSRESPONSE(res, "Message sent successfully", msg);
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    return ERRORRESPONSE(res, "Message not sent", err.message || "Something went wrong");
  }
};


module.exports.ResetPassControllers = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    console.log("🔐 Reset Password Request Received");
    console.log("Token:", token);
    console.log("Password:", password, "ConfirmPassword:", confirmPassword);

    if (!token) {
      return ERRORRESPONSE(res, "❌ Reset token is missing in URL", 400);
    }
    if (!password || !confirmPassword) {
      return ERRORRESPONSE(res, "❌ Password and confirm password are required", 400);
    }

    const msg = await resetPassword(token, password, confirmPassword);
    return SUCCESSRESPONSE(res, msg, 200);
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    return ERRORRESPONSE(res, "Something went wrong", err.message || 500);
  }
};