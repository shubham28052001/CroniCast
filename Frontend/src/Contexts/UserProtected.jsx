import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const UserProtected = ({ children }) => {
  const { user, loading } = useContext(UserContext);

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
};

export default UserProtected;