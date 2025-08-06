const transporter = require('../Config/nodemailer')
const userModel=require("../Models/user.model")
const {GENERATETOKEN,VERIFYTOKEN}=require("../utils/jwt.utils")
const {HASHEDPASSWORD}= require("../utils/hash.utils")
module.exports.registerUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        console.log("🟨 [VALIDATION] Errors:Please fill all fields")
        throw new Error('Please fill in all fields')
    }
   console.log("🟥 [BACKEND]: Checking email", email)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log('🟥 [BACKEND]:Email already Exist');
        throw new Error('🟥 [BACKEND]:Email already Exist')
    }
    const user = await userModel.create({
        name,
        email,
        password
    });

    const welcomeMsg = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Welcome, ${name}! 🎉</h2>
      <p style="font-size: 16px;">Thank you for signing up for <strong>${process.env.APP_NAME || "Our Blog App"}</strong>.</p>
      <p style="font-size: 16px;">We're excited to have you with us! Here are a few things you can do right away:</p>
      <ul style="font-size: 15px;">
        <li>📝 Start writing your first blog</li>
        <li>👤 Update your profile</li>
        <li>💬 Share feedback or contact support</li>
      </ul>
      <p style="font-size: 16px;">If you ever need help, we’re just an email away.</p>
      <br />
      <p style="font-size: 16px;">Cheers,</p>
      <p style="font-weight: bold;">The ${process.env.APP_NAME || "Cronicast☄️ App"} Team</p>
    </div>
    `;
    console.log("🟥 [BACKEND]:Welcome message is sent to the register email id:",email);

    await transporter.sendMail({
        to: email,
        subject: `🎉 Welcome to ${process.env.APP_NAME || "Our Cronicast☄️ App"}, ${name}!`,
        html: welcomeMsg
    });
    return user;
}

module.exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    console.log("🟨 [VALIDATION] Error: Please fill all fields");
    throw new Error("Please fill in all fields");
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    console.log("🟥 [BACKEND]: Email does not exist");
    throw new Error("Email does not Exist");
  }

  return user;
};

module.exports.sendContactMailService = async ({ name, email, message }) => {
  try {
    console.log("📩 Sending contact email with data:", { name, email, message });

    const mailOptions = {
      from: email, // ✅ This should be a verified email in some providers like Gmail
      to: process.env.MAIL_USER,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">📬 New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${message}
            </div>
            <br />
            <p style="font-size: 14px; color: #888;">This message was submitted through the contact form on your app.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports.ForgotLink= async({email})=>{
   console.log("Received email:", email);
    if (!email) {
        throw new Error('Please fill in all fields')
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Email not registered")
    };
    const token = GENERATETOKEN({ id: user._id });
    const resetLink = `${process.env.FRONTEND_URL||'http://localhost:5173'}/reset-password/${token}`;
    await transporter.sendMail({
        to: email,
        subject: "🔐 Reset Your Password - Action Required",
        html: ` <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p style="font-size: 16px;">Hi there,</p>
      <p style="font-size: 16px;">
        We received a request to reset your password for <strong>${process.env.APP_NAME || "your account"}</strong>.
        If you made this request, click the button below:
      </p>
      <a href="${resetLink}" 
         style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
         🔁 Reset Password
      </a>
      <p style="font-size: 14px; margin-top: 20px;">
        This link is valid for <strong>15 minutes</strong>. If you didn’t request a password reset, you can safely ignore this email.
      </p>
      <br />
       <p>
    Need help? Contact our support team anytime at 
    <a href="${process.env.MAIL_USER}" style="color: #007bff;">${process.env.MAIL_USER}</a>
  </p>
      <p style="font-size: 16px;">Thanks,</p>
      <p style="font-weight: bold;">The ${process.env.APP_NAME || "Support"} Team</p>
    </div>`
    });

    return "Reset link sent to your email.";
};

module.exports.resetPassword = async (token, password, confirmPassword) => {
    console.log("🔐 Reset Password triggered");

    // ✅ Validate input
    if (!password || !confirmPassword) {
        console.log("❌ Missing password fields");
        throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
        console.log("❌ Passwords do not match");
        throw new Error("Passwords do not match");
    }

    // ✅ Verify token
    let decoded;
    try {
        decoded = VERIFYTOKEN(token);
        console.log("✅ Token decoded:", decoded);
    } catch (err) {
        console.error("❌ JWT verification failed:", err.message);
        throw new Error("Invalid or expired reset token");
    }

    // ✅ Get user from decoded token
    const userId = decoded.id || decoded._id;
    const user = await userModel.findById(userId);

    if (!user) {
        console.log("❌ No user found for ID:", userId);
        throw new Error("User not found");
    }

    // ✅ Update password
    try {
        const hashedPassword= await HASHEDPASSWORD(password)
        user.password = hashedPassword;
        await user.save();

        console.log("✅ Password updated successfully for user:", user.email);
        return "✅ Password reset successful";
    } catch (err) {
        console.error("❌ Error while saving new password:", err.message);
        throw new Error("Something went wrong while resetting the password");
    }
};
