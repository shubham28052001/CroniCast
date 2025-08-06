// src/utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000", // 🟢 fallback for local
  withCredentials: true, // ✅ Required for sending cookies (auth/session)
});

export default API;