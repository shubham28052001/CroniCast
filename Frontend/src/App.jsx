import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RedirectIfAuth from './Contexts/RedirectIfAuth';
import UserProtected from './Contexts/UserProtected';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { Zoom } from "react-toastify";  
import { Bounce } from "react-toastify";
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import BlogDetail from "./Components/BlogDetail"
import MyBlogs from './Pages/MyBlogs';
import CreateBlog from './Pages/CreateBlog';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Edit from "./Components/Edit"
import ForgotPassword from "./Components/ForgotPassword"
import ResetPassword from './Components/ResetPassword';
import Front from './Pages/Front';
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
              <Front />
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>

              <Login />
            </RedirectIfAuth>

          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtected>
            <Home />
            </UserProtected>
          }
        />

        <Route path="/blogs/:blogId" element={
          <UserProtected>
          <BlogDetail />
          </UserProtected>
        }
           />
        <Route path="/my-blog" element={
          <UserProtected>
          <MyBlogs />
          </UserProtected>
          } />
        <Route path="/create-blog" element={
          <UserProtected>
          <CreateBlog />
          </UserProtected>
          } />
          <Route path="/about" element={
          <UserProtected>
          <About />
          </UserProtected>
          } />
          <Route path="/services" element={
          <UserProtected>
          <Services />
          </UserProtected>
          } />
           <Route path="/contact" element={
          <UserProtected>
          <Contact  />
          </UserProtected>
          } />
           <Route path="/edit-blog/:blogId" element={
          <UserProtected>
          <Edit  />
          </UserProtected>
          } />
          <Route path="/forgot-password" element={<ForgotPassword  />} />
          <Route path="/reset-password/:token" element={< ResetPassword  />} />


      </Routes>
<ToastContainer
  position="bottom-right"
   hideProgressBar
   transition={Zoom}
    rtl
  theme="dark"
  autoClose={1000}
/>
    </div>
  )
}

export default App
