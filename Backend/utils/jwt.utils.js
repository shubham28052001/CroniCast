const jwt = require("jsonwebtoken")


module.exports.GENERATETOKEN = (payload) => {
    console.log("🔐 [JWT] Generating token with payload:", payload);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};


module.exports.VERIFYTOKEN = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};