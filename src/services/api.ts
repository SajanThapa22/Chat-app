import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
// https://chat-app-xcsf.onrender.com/

export default axios.create({
  baseURL: API_URL,
});
