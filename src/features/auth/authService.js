// import axios from 'axios'
import axios from "/axiosConfig";
import { toast } from 'react-toastify'
// function api(url) {
//     return 'https://mern-backend-test.onrender.com/api/' + url
//     // return 'http://localhost:5000/api/' + url
// }
// const config = {
//     headers: {}
// };

const getAllUser = async () => {
    const response = await axios.get('users')
        .then(function (res) {
            console.log(res.data);
            return res
        })
    // const response = await axios.get('https://acc-attendance-backend.onrender.com/api/users', config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    return response.data
}

const register = async (userData) => {
    const response = await axios.post('users', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post('users/login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    getAllUser,
    logout
}

export default authService
