import React, { createContext, useState, useEffect } from "react";
import API from "../utils/axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile",{
        withCredentials:true,
      });
      console.log("✅ Profile fetched:", res.data.data);
      setUser(res.data.data); 
    } catch (err) {
      console.error("❌ Failed to fetch profile:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
    fetchProfile();
  }, []);

 if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center  bg-gray-900 text-white text-xl font-semibold">
       <div className="w-10 h-10 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
