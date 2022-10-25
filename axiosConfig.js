import axios from "axios";

axios.defaults.baseURL = 'https://capstone-attendance-backend.onrender.com/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(localStorage.getItem('user'))?.token;
// axios.defaults.baseURL = 'http://localhost:5000/api/';
export default axios.create()
