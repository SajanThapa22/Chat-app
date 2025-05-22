import axios from "axios";
// localhost: http://127.0.0.1:8000/
export default axios.create({
  baseURL: "https://chat-app-xcsf.onrender.com/",
});
