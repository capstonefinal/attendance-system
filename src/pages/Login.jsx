import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        if (isSuccess) {
            navigate('/');
            toast.success('Welcome!');
            dispatch(reset())
            
        }
        if (user) {
            navigate('/')
        }

    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    const [userData, setUser] = useState({
        username: '',
        password: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (!userData.username && !userData.password) {
                toast.error('Please fill all fields')
                return
            }
        dispatch(login(userData)) 
    }
    const onChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }
    return <>
        <div className="bg-slate-900 bg-opacity-40 rounded-xl shadow-xl text-white p-20 overflow-clip m-auto items-center justify-center flex flex-col">
            <p className="w-full text-6xl mb-20 text-center">Login</p>
            <form onSubmit={onSubmit} className='flex flex-col space-y-6'>
                <div className='w-full flex flex-col'>
                    <label htmlFor="username" className='text-sm tracking-widest mb-1'>Username</label>
                    <input className='bg-transparent border-white border rounded-md px-4' type="text" name="username" id="username" placeholder='Username' value={userData.username} onChange={ onChange } autoComplete='off' autoFocus/>
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="password" className='text-sm tracking-widest mb-1'>Password</label>
                    <input className='bg-transparent border-white border rounded-md px-4' type="password" name="password" id="password" placeholder='Password' value={userData.password} onChange={ onChange } />
                </div>
                <button className='bg-slate-900 hover:bg-opacity-50 rounded-md py-2'>Login</button>
                <p onClick={()=> navigate('/register')} className='text-xs hover:text-blue-500 hover:cursor-pointer'>Create account</p>
            </form>
        </div>
    </>
}