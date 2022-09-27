import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Subject from "./pages/Subject";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import SubjectClass from "./pages/SubjectClass";
import Course from "./pages/Course";
import CourseStudent from "./pages/CourseStudent";

export default function App() {
  const user = useSelector((state)=>state.auth.user)
  const navigate = useNavigate()
  // useEffect(() => {
  //   !user && navigate("/login")
  // }, [user])
  const {isLoading} = useSelector((state)=>state.auth)
  return (
    <div className="flex h-screen w-full">
      
      {user && <Sidebar /> }
      <Routes>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="attendance" element={ <Attendance/>} />
          <Route path="subjects" element={<Subject/>} />
          <Route path="subjects/:subject" element={<SubjectClass/>} />
          <Route path="courses" element={<Course/>} />
          <Route path="courses/:course" element={<CourseStudent/>} />
          <Route path="*" element={<p>404 Page Not Found 404</p>} />
          {/* <Route path="profile" element={ <Profile />} /> */}
      </Routes>
      <ToastContainer
        theme= "dark"
        position="top-center"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        // limit={2}
        // hideProgressBar
        // rtl={false}
      />
      
      {isLoading && <div className=" w-full h-full bg-opacity-60 fixed inset-0 z-40 bg-black flex justify-center items-center space-x-6 ">
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-1"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-2"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-3"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-4"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-5"/>
          <div className="mb-40 bg-white h-2 w-2 rounded-full blur-sm animate-ping animation-delay-6"/>
          {/* <div className="bg-white h-6 w-6 rounded-full blur-sm animate-ping animation-delay-7"/> */}
          {/* <div className="bg-white h-6 w-6 rounded-full blur-sm animate-ping animation-delay-8"/> */}
          {/* <div className="bg-white h-6 w-6 rounded-full blur-sm animate-ping animation-delay-9"/> */}
      </div>}
    </div>
  )
}