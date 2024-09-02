import axios from "axios";

const API_BASE_URL = "http://localhost:5027/api";
const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // PATCH isteği için gerekli
  },
  timeout: 10000,
});
export default ApiClient;
