const { VERIFYTOKEN } = require("../utils/jwt.utils");
const { ERRORRESPONSE } = require("../utils/resposnse.utils");
const userModel = require("../Models/user.model");
const Blacklist = require("../Models/blacklist.model")
module.exports.Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("🔐 Received Token:", !!token);

    if (!token) {
      console.warn("🔒 No token provided.");
      return ERRORRESPONSE(res, "Unauthorized: Token missing", 401);
    }
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) return ERRORRESPONSE(res, "Token is blacklisted. Please login again.", 401);

    const decoded = VERIFYTOKEN(token);
    if (!decoded) {
      console.warn("❌ Token verification failed.");
      return ERRORRESPONSE(res, "Unauthorized: Invalid token", 401);
    }

    const user = await userModel.findById(decoded._id).select('-password');
    if (!user) {
      console.warn("❌ User not found for token.");
      return ERRORRESPONSE(res, "Unauthorized: Invalid token", 401);
    }

    req.user = user;
    console.log("✅ Authenticated user:", user.email);
    next();
  } catch (error) {
    console.error("❌ [AUTH] Error:", error.message);
    return ERRORRESPONSE(res, "Unauthorized: Invalid or expired token", 401);
  }
};
