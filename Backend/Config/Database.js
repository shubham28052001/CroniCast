const mongoose = require("mongoose")

const ConnectToDB = async () => {
  try {
 const connect=await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("💾Connected to MongoDB ✅")
})
 } catch (error) {
console.error("💾MongoDB connection failed:", error.message);
process.exit(1);
 }
};
module.exports = ConnectToDB;