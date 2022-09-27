import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset , logout } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LinkTo from "./LinkTo";

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShown, setIsShown] = useState(true)
  const toggle = () => {
    setIsShown(!isShown)
  }
  const handleLogout = () => {
    dispatch(reset())
    dispatch(logout())
    navigate('/login')
    toast('Logout successful')
  }
  return <aside className={`ease-in-out duration-500 flex-none bg-slate-900 h-screen flex flex-col py-2 space-y-8 ${isShown ? "w-60" : " w-12"}`}>
    {/* <aside className={`ease-in-out duration-300 flex-none bg-slate-900 h-screen py-3 px-2 flex flex-col space-y-1 ${isShown ? "translate-x-0 w-64" : " w-14"}`}> */}
    <div className="w-full flex flex-none h-8 delay-1000 ease-in-out transition-all bg-inherit">
      <svg onClick={toggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-full hover:text-red-500 hover:cursor-pointer flex-none">
        {
          isShown ?
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            :
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        }
      </svg>
      <p className={`ease-in-out duration-1000 text-2xl w-full tracking-widest font-normal z-0 ${isShown ? 'ml-3' : '-translate-x-80'}`}>AMS</p>
    </div>
    <div className="flex flex-col justify-between h-full w-full bg-slate-900">
      <div className="flex flex-col w-full space-y-2 bg-slate-900">
        <LinkTo isShown={isShown} to="/" caption="Dashboard"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          } />
        <LinkTo isShown={isShown} to="attendance" caption="Attendance"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 flex-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>

          } />
        <LinkTo isShown={isShown} to="subjects" caption="Subjects"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 flex-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          } />
        <LinkTo isShown={isShown} to="courses" caption="Courses"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 flex-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>

          } />
        {/* <LinkTo isShown={isShown} to="profile" caption="Profile"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 flex-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          } /> */}
      </div>

      <button onClick={handleLogout} className="flex items-center h-8 hover:text-red-600 w-full bg-slate-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 flex-none bg-inherit z-30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
            <span className={`ease-in-out duration-500 ${isShown ? 'ml-3 text-xl' : 'z-0 w-0 -translate-x-80'}`}>Logout</span>
        {/* {isShown ?
            <span className="ml-3 text-xl">Logout</span>
            : null
        } */}
      </button>
    </div>
  </aside>
}