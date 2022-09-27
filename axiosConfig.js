import axios from "axios";

axios.defaults.baseURL = 'https://capstone-attendance-backend.onrender.com/api/';
// axios.defaults.baseURL = 'http://localhost:5000/api/';
export default axios.create()